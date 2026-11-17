// Data layer. Uses Supabase when js/config.js has keys; otherwise a browser-only demo store.
(function(){
const cfg = window.CLA_CONFIG || {};
const live = !!(cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY && window.supabase);
const SITE_URL = location.origin + location.pathname.replace(/index\.html$/, "");

function friendly(err){
  const m = (err && (err.message || err.error_description || String(err))) || "Something went wrong.";
  if (/database error|not_invited|has not been invited/i.test(m)) return "That email isn't on the invite list. Ask your manager to invite you.";
  if (/rate limit|too many|seconds/i.test(m)) return "Too many requests. Please wait a minute and try again.";
  return m;
}

// ---------------- Supabase ----------------
function supabaseApi(){
  const sb = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
  });
  let me = null;   // profile row
  const api = {
    mode: "live",
    onAuthChange(cb){ sb.auth.onAuthStateChange((evt) => { if (evt === "SIGNED_IN" || evt === "SIGNED_OUT") cb(evt); }); },
    async current(){
      const { data: { session } } = await sb.auth.getSession();
      if (!session) { me = null; return { session: null }; }
      const { data, error } = await sb.from("profiles").select("*").eq("id", session.user.id).maybeSingle();
      if (error) throw error;
      me = data;
      if (me) sb.from("profiles").update({ last_seen: new Date().toISOString() }).eq("id", me.id).then(() => {});
      return { session, profile: me, email: session.user.email };
    },
    async sendLink(email){
      const { error } = await sb.auth.signInWithOtp({ email: email.trim().toLowerCase(), options: { emailRedirectTo: SITE_URL, shouldCreateUser: true } });
      if (error) throw new Error(friendly(error));
    },
    async signOut(){ await sb.auth.signOut(); me = null; },
    async myAttempts(courseId){
      const { data, error } = await sb.from("attempts").select("*").eq("course_id", courseId).eq("user_id", me.id).order("created_at");
      if (error) throw error; return data;
    },
    async saveAttempt(courseId, a){
      const { error } = await sb.from("attempts").insert({ course_id: courseId, mode: a.mode, score: a.score, total: a.total, pct: a.pct, passed: a.passed, secs: a.secs, sections: a.sections, missed: a.missed, timed_out: !!a.timedOut });
      if (error) throw error;
    },
    async myProgress(courseId){
      const { data, error } = await sb.from("lesson_progress").select("lesson_id,completed_at").eq("course_id", courseId).eq("user_id", me.id);
      if (error) throw error;
      return Object.fromEntries(data.map(r => [r.lesson_id, r.completed_at]));
    },
    async setProgress(courseId, lessonId, done){
      const q = done
        ? sb.from("lesson_progress").upsert({ user_id: me.id, course_id: courseId, lesson_id: lessonId })
        : sb.from("lesson_progress").delete().eq("user_id", me.id).eq("course_id", courseId).eq("lesson_id", lessonId);
      const { error } = await q; if (error) throw error;
    },
    admin: {
      async invites(){ const { data, error } = await sb.from("invites").select("*").order("invited_at"); if (error) throw error; return data; },
      async addInvites(rows){
        const { error } = await sb.from("invites").upsert(rows.map(r => ({ email: r.email, full_name: r.name || null, role: r.role, invited_by: me.id })), { onConflict: "email" });
        if (error) throw error;
      },
      async sendInvite(email){
        const { error } = await sb.auth.signInWithOtp({ email, options: { emailRedirectTo: SITE_URL, shouldCreateUser: true } });
        if (error) throw new Error(friendly(error));
      },
      async removeInvite(email){
        let r = await sb.from("profiles").delete().eq("email", email); if (r.error) throw r.error;
        r = await sb.from("invites").delete().eq("email", email); if (r.error) throw r.error;
      },
      async team(courseId){
        const [p, a, g] = await Promise.all([
          sb.from("profiles").select("*"),
          sb.from("attempts").select("user_id,mode,pct,passed,sections,missed,created_at").eq("course_id", courseId).order("created_at"),
          sb.from("lesson_progress").select("user_id,lesson_id").eq("course_id", courseId)
        ]);
        for (const r of [p, a, g]) if (r.error) throw r.error;
        return { profiles: p.data, attempts: a.data, progress: g.data };
      }
    }
  };
  return api;
}

// ---------------- Demo (browser only) ----------------
function demoApi(){
  const K = "cla-training-demo-v1";
  const load = () => { try { return JSON.parse(localStorage.getItem(K)) || null; } catch(e){ return null; } };
  const save = (d) => { try { localStorage.setItem(K, JSON.stringify(d)); } catch(e){} };
  let d = load() || { invites: [{ email: "demo@clatitle.com", full_name: "Demo Admin", role: "admin", invited_at: new Date().toISOString() }], attempts: [], progress: [] };
  save(d);
  const me = { id: "demo", email: "demo@clatitle.com", full_name: "Demo Admin", role: "admin" };
  return {
    mode: "demo",
    onAuthChange(){},
    async current(){ return { session: { demo: true }, profile: me, email: me.email }; },
    async sendLink(){},
    async signOut(){},
    async myAttempts(c){ return d.attempts.filter(a => a.course_id === c && a.user_id === me.id); },
    async saveAttempt(c, a){ d.attempts.push(Object.assign({ course_id: c, user_id: me.id, created_at: new Date().toISOString() }, a)); save(d); },
    async myProgress(c){ return Object.fromEntries(d.progress.filter(p => p.course_id === c && p.user_id === me.id).map(p => [p.lesson_id, p.completed_at])); },
    async setProgress(c, l, done){
      d.progress = d.progress.filter(p => !(p.course_id === c && p.lesson_id === l && p.user_id === me.id));
      if (done) d.progress.push({ user_id: me.id, course_id: c, lesson_id: l, completed_at: new Date().toISOString() });
      save(d);
    },
    admin: {
      async invites(){ return d.invites; },
      async addInvites(rows){ rows.forEach(r => { d.invites = d.invites.filter(i => i.email !== r.email); d.invites.push({ email: r.email, full_name: r.name || null, role: r.role, invited_at: new Date().toISOString() }); }); save(d); },
      async sendInvite(){},
      async removeInvite(e){ d.invites = d.invites.filter(i => i.email !== e); save(d); },
      async team(c){ return { profiles: [Object.assign({ created_at: new Date().toISOString(), last_seen: new Date().toISOString() }, me)], attempts: d.attempts.filter(a => a.course_id === c), progress: d.progress.filter(p => p.course_id === c) }; }
    }
  };
}

window.API = live ? supabaseApi() : demoApi();
})();
