(function(){
const API = window.API, CFG = window.CLA_CONFIG || {}, ALL_COURSES = window.COURSES || [];
let COURSES = ALL_COURSES.filter(c => !c.draft);
const $ = id => document.getElementById(id);
const L = "ABCDE", STORE_KEY = "cla-training-exam-progress-v2";
const views = ["vLoading","vLogin","vCourses","vHome","vLearn","vLesson","vExam","vResult","vAdmin"];
function show(v){ views.forEach(x => $(x).classList.toggle("hide", x !== v)); window.scrollTo(0,0); }
function shuffle(a){ a = a.slice(); for (let i = a.length-1; i > 0; i--){ const j = Math.floor(Math.random()*(i+1)); [a[i],a[j]] = [a[j],a[i]]; } return a; }
function esc(s){ const d = document.createElement("div"); d.textContent = s == null ? "" : String(s); return d.innerHTML; }
function fmt(sec){ sec = Math.max(0, Math.round(sec)); return Math.floor(sec/60) + ":" + String(sec%60).padStart(2,"0"); }
function dateStr(s){ return s ? new Date(s).toLocaleDateString() : "—"; }
function msg(el, text, ok){ el.innerHTML = text ? `<div class="msg ${ok ? "ok" : "err"}">${esc(text)}</div>` : ""; }

if (CFG.COMPANY) $("coName").textContent = CFG.COMPANY;
if (CFG.SITE_NAME) $("siteName").textContent = CFG.SITE_NAME;
if (API.mode === "demo") $("demoBar").classList.remove("hide");

// ---------- state ----------
let ME = null;          // profile
let C = null;           // current course
let byId = {};          // question lookup for current course
let learned = {};
let S = null, tick = null, lastRes = null, fromLesson = null, curLesson = 0;

function setCourse(c){
  C = c; byId = Object.fromEntries(c.questions.map(q => [q.id, q]));
}

// ---------- auth ----------
async function boot(){
  show("vLoading");
  let cur;
  try { cur = await API.current(); }
  catch(e){ $("vLoading").innerHTML = `<div class="empty">Couldn't connect. Please refresh the page.<br><span class="note">${esc(e.message||e)}</span></div>`; return; }
  if (!cur.session){ ME = null; setNav(false); show("vLogin"); return; }
  if (!cur.profile){
    setNav(false); $("navOut").classList.remove("hide");
    $("vLoading").innerHTML = `<div class="card login"><h1>No access</h1><p class="note">${esc(cur.email)} doesn't have access to training. Ask your manager to invite you.</p></div>`;
    show("vLoading"); return;
  }
  ME = cur.profile;
  COURSES = ALL_COURSES.filter(c => !c.draft || ME.role === "admin");
  $("who").textContent = ME.full_name || ME.email;
  setNav(true);
  if (location.hash) history.replaceState(null, "", location.pathname);   // clear auth tokens from the address bar
  C = null;
  if (COURSES.length === 1){ await openCourse(COURSES[0]); } else renderCourses();
}
function setNav(on){
  ["navHome","navLearn","navOut"].forEach(id => $(id).classList.toggle("hide", !on || API.mode === "demo" && id === "navOut"));
  $("navHome").classList.toggle("hide", !on);
  $("navLearn").classList.toggle("hide", !on || !C);
  $("navAdmin").classList.toggle("hide", !(on && ME && ME.role === "admin"));
  if (!on) $("who").textContent = "";
}
API.onAuthChange(() => boot());

$("loginForm").addEventListener("submit", async e => {
  e.preventDefault();
  const email = $("loginEmail").value.trim();
  if (!email) return;
  $("loginBtn").disabled = true; msg($("loginMsg"), "");
  try { await API.sendLink(email); msg($("loginMsg"), "Check your email for a sign-in link. You can close this tab; the link opens the site signed in.", true); }
  catch(err){ msg($("loginMsg"), err.message || String(err), false); }
  $("loginBtn").disabled = false;
});
$("navOut").onclick = async () => { clearInterval(tick); S = null; await API.signOut(); boot(); };

// ---------- courses ----------
function renderCourses(){
  show("vCourses");
  $("navLearn").classList.add("hide");
  $("courseList").innerHTML = COURSES.map((c,i) => `<div class="card course-card"><div>${c.draft ? '<span class="status invited" style="margin-bottom:6px;display:inline-block">Draft — only admins can see this</span>' : ""}<h3>${esc(c.title)}</h3><p class="note" style="margin:4px 0 0">${esc(c.description)}</p></div><button class="btn" data-i="${i}">Open</button></div>`).join("");
}
$("courseList").addEventListener("click", e => { const b = e.target.closest("button"); if (b) openCourse(COURSES[+b.dataset.i]); });

async function openCourse(c){
  setCourse(c);
  $("navLearn").classList.remove("hide");
  try { learned = await API.myProgress(c.id); } catch(e){ learned = {}; }
  renderHome();
}
function renderHome(){
  show("vHome");
  $("cTitle").textContent = C.title + (C.draft ? " (draft)" : ""); $("cSub").textContent = C.subtitle || ""; $("cDesc").textContent = C.description || "";
  const n = Object.values(C.exam.counts).reduce((a,b) => a+b, 0);
  $("nExam").textContent = n; $("nMin").textContent = C.exam.minutes; $("nPass").textContent = C.exam.pass;
  const counts = {}; C.questions.forEach(q => counts[q.s] = (counts[q.s]||0)+1);
  $("secSel").innerHTML = `<option value="ALL">All sections (${C.questions.length})</option>` + Object.entries(C.sections).map(([k,v]) => `<option value="${k}">${esc(v)} (${counts[k]||0})</option>`).join("");
  $("bankInfo").textContent = `Question bank: ${C.questions.length} questions.` + (C.source ? ` Source: ${C.source}.` : "") + (C.draft ? " This course is a draft: only admins can see it." : "");
  renderProg(); checkResume(); loadHistory();
}
async function loadHistory(){
  const el = $("myHist"); el.textContent = "Loading…";
  let at;
  try { at = (await API.myAttempts(C.id)).filter(a => a.mode === "exam"); }
  catch(e){ el.textContent = "History isn't available right now."; return; }
  if (!at.length){ el.innerHTML = "No exam attempts yet."; return; }
  const best = Math.max(...at.map(a => a.pct));
  const secAgg = {}; at.forEach(a => Object.entries(a.sections||{}).forEach(([k,[c,t]]) => { secAgg[k] = secAgg[k]||[0,0]; secAgg[k][0]+=c; secAgg[k][1]+=t; }));
  const weak = Object.entries(secAgg).sort((x,y) => x[1][0]/x[1][1] - y[1][0]/y[1][1])[0];
  el.innerHTML = `<table><tr><th>Date</th><th>Score</th><th></th></tr>${at.slice(-5).reverse().map(a => `<tr><td>${dateStr(a.created_at)}</td><td>${a.pct}%</td><td>${a.passed ? '<span style="color:var(--good);font-weight:600">Pass</span>' : '<span style="color:var(--bad);font-weight:600">Fail</span>'}</td></tr>`).join("")}</table>
  <div style="margin-top:10px">Best: <b>${best}%</b> · Attempts: <b>${at.length}</b>${weak ? `<br>Focus area: <b>${esc(C.sections[weak[0]])}</b> (${Math.round(100*weak[1][0]/weak[1][1])}%)` : ""}</div>`;
}

// ---------- exam engine ----------
function storeKey(){ return STORE_KEY + ":" + (ME ? ME.id : "") + ":" + C.id; }
function save(){ if (!S || S.mode !== "exam") return; try { localStorage.setItem(storeKey(), JSON.stringify(S)); } catch(e){} }
function clearSaved(){ try { localStorage.removeItem(storeKey()); } catch(e){} }
function readSaved(){ try { return JSON.parse(localStorage.getItem(storeKey()) || "null"); } catch(e){ return null; } }
function checkResume(){
  const s = readSaved();
  const ok = s && s.mode === "exam" && s.deadline > Date.now() && s.items.every(it => byId[it.id]);
  $("resumeBanner").classList.toggle("hide", !ok);
  if (!ok && s) clearSaved();
}
function makeItems(ids){ return ids.map(id => ({ id, order: shuffle(byId[id].o.map((_,i) => i)), pick: null, flag: false, checked: false })); }

function startExam(){
  let ids = [];
  Object.entries(C.exam.counts).forEach(([sec,n]) => { ids = ids.concat(shuffle(C.questions.filter(q => q.s === sec)).slice(0,n).map(q => q.id)); });
  S = { mode: "exam", items: makeItems(ids), cur: 0, started: Date.now(), deadline: Date.now() + C.exam.minutes*60000 };
  fromLesson = null; save(); runExam();
}
function startPractice(){
  fromLesson = null;
  const sec = $("secSel").value;
  S = { mode: "practice", items: makeItems(shuffle(C.questions.filter(q => sec === "ALL" || q.s === sec)).map(q => q.id)), cur: 0, started: Date.now() };
  runExam();
}
function practiceIds(ids, idx){
  fromLesson = idx;
  S = { mode: "practice", items: makeItems(shuffle(ids.filter(id => byId[id]))), cur: 0, started: Date.now() };
  runExam();
}
function runExam(){
  show("vExam");
  const ex = S.mode === "exam";
  $("submitBtn").textContent = ex ? "Submit exam" : "Finish practice";
  $("sideLabel").textContent = ex ? "Time remaining" : "Elapsed";
  $("flagBtn").classList.toggle("hide", !ex);
  clearInterval(tick); tick = setInterval(updTimer, 1000); updTimer();
  renderQ();
}
function updTimer(){
  if (!S) return;
  if (S.mode === "exam"){
    const left = (S.deadline - Date.now())/1000;
    $("timer").textContent = fmt(left); $("timer").classList.toggle("low", left < 300);
    if (left <= 0){ clearInterval(tick); finish(true); }
  } else $("timer").textContent = fmt((Date.now() - S.started)/1000);
}
function renderQ(){
  const it = S.items[S.cur], q = byId[it.id], ex = S.mode === "exam";
  $("qNum").textContent = `Question ${S.cur+1} of ${S.items.length}`;
  $("qSec").textContent = C.sections[q.s];
  $("qText").textContent = q.q;
  $("rateBox").classList.toggle("hide", !(q.r && C.rateCharts));
  $("flagBtn").classList.toggle("on", it.flag);
  const reveal = !ex && it.checked;
  $("qOpts").innerHTML = it.order.map((oi,pos) => {
    let c = "opt";
    if (reveal){ if (oi === q.a) c += " right"; else if (oi === it.pick) c += " wrong"; }
    else if (it.pick === oi) c += " sel";
    return `<button class="${c}" data-oi="${oi}" ${reveal ? "disabled" : ""}><span class="k">${L[pos]}</span><span>${esc(q.o[oi])}</span></button>`;
  }).join("");
  $("qExplain").innerHTML = reveal ? `<div class="explain"><b>${it.pick === q.a ? "Correct." : "Not quite."}</b> ${esc(q.e)} ${q.p ? `<span class="note">— Course book p. ${esc(q.p)}</span>` : ""}</div>` : "";
  $("prevBtn").disabled = S.cur === 0;
  $("nextBtn").textContent = S.cur === S.items.length-1 ? (ex ? "Review & submit" : "Finish") : "Next →";
  $("checkBtn").disabled = it.pick === null;
  $("checkBtn").classList.toggle("hide", ex || it.checked);
  $("dots").innerHTML = S.items.map((x,i) => `<button class="dot ${x.pick !== null ? "ans" : ""} ${x.flag ? "flag" : ""} ${i === S.cur ? "cur" : ""}" data-i="${i}">${i+1}</button>`).join("");
  $("progTxt").textContent = `${S.items.filter(x => x.pick !== null).length} of ${S.items.length} answered` + (ex ? ` · ${S.items.filter(x => x.flag).length} flagged` : "");
}
$("qOpts").addEventListener("click", e => {
  const b = e.target.closest(".opt"); if (!b || b.disabled) return;
  const it = S.items[S.cur]; if (S.mode !== "exam" && it.checked) return;
  it.pick = +b.dataset.oi; save(); renderQ();
});
$("dots").addEventListener("click", e => { const b = e.target.closest(".dot"); if (!b) return; S.cur = +b.dataset.i; save(); renderQ(); });
$("prevBtn").onclick = () => { if (S.cur > 0){ S.cur--; save(); renderQ(); } };
$("nextBtn").onclick = () => { if (S.cur < S.items.length-1){ S.cur++; save(); renderQ(); } else askSubmit(); };
$("checkBtn").onclick = () => { const it = S.items[S.cur]; if (it.pick === null) return; it.checked = true; renderQ(); };
$("flagBtn").onclick = () => { const it = S.items[S.cur]; it.flag = !it.flag; save(); renderQ(); };
$("submitBtn").onclick = askSubmit;
$("quitBtn").onclick = () => confirmBox("Quit?", S.mode === "exam" ? "This exam will be thrown out and won't be scored or saved." : "Your practice progress won't be saved.", () => { clearInterval(tick); clearSaved(); S = null; renderHome(); });
function askSubmit(){
  if (S.mode !== "exam"){ finish(false); return; }
  const un = S.items.filter(x => x.pick === null).length, fl = S.items.filter(x => x.flag).length;
  confirmBox("Submit exam?", (un ? `You have ${un} unanswered question${un > 1 ? "s" : ""}. Unanswered questions are marked wrong. ` : "All questions answered. ") + (fl ? `${fl} still flagged. ` : "") + "You can't change answers after you submit.", () => finish(false));
}
function confirmBox(t, b, yes){
  $("mdT").textContent = t; $("mdB").textContent = b; $("modal").classList.add("on");
  $("mdYes").onclick = () => { $("modal").classList.remove("on"); yes(); };
  $("mdNo").onclick = () => $("modal").classList.remove("on");
}
document.addEventListener("keydown", e => {
  if ($("vExam").classList.contains("hide") || $("modal").classList.contains("on") || !S) return;
  const pos = L.indexOf(e.key.toUpperCase());
  if (pos >= 0 && pos < 4){ const it = S.items[S.cur]; if (S.mode !== "exam" && it.checked) return; it.pick = it.order[pos]; save(); renderQ(); }
  else if (e.key === "ArrowRight") $("nextBtn").click();
  else if (e.key === "ArrowLeft") $("prevBtn").click();
});

// ---------- results ----------
async function finish(timedOut){
  clearInterval(tick);
  const ex = S.mode === "exam";
  const items = ex ? S.items : S.items.filter(x => x.pick !== null);
  if (!items.length){ S = null; renderHome(); return; }
  const secs = {}; let correct = 0; const missed = [];
  items.forEach(it => { const q = byId[it.id]; secs[q.s] = secs[q.s] || [0,0]; secs[q.s][1]++; if (it.pick === q.a){ secs[q.s][0]++; correct++; } else missed.push(it.id); });
  const pct = Math.round(100*correct/items.length);
  const attempt = { mode: S.mode, score: correct, total: items.length, pct, passed: ex && pct >= C.exam.pass, secs: Math.round((Date.now()-S.started)/1000), sections: secs, missed, timedOut: !!timedOut };
  lastRes = { attempt, items };
  clearSaved(); S = null;
  renderResult(timedOut);
  try { await API.saveAttempt(C.id, attempt); $("rSaved").textContent = ex ? "Saved to your record." : "Practice session saved to your history."; }
  catch(e){ $("rSaved").textContent = "Couldn't save this result: " + (e.message || e); }
}
function renderResult(timedOut){
  const { attempt: a } = lastRes, ex = a.mode === "exam";
  show("vResult");
  $("rPct").textContent = a.pct + "%"; $("rPct").className = "big " + (ex ? (a.passed ? "pass" : "fail") : "");
  $("rRaw").textContent = `${a.score} of ${a.total} correct`;
  $("rVerdict").textContent = ex ? (a.passed ? "Passed" : `Not passed — ${C.exam.pass}% required`) : "Practice complete";
  $("rMeta").textContent = (timedOut ? "Time expired — auto-submitted. " : "") + "Time used: " + fmt(a.secs);
  $("rSaved").textContent = "Saving…";
  $("backToLesson").classList.toggle("hide", fromLesson === null);
  $("rSecs").innerHTML = Object.entries(a.sections).map(([k,[c,t]]) => { const p = Math.round(100*c/t); return `<div class="secrow"><div>${esc(C.sections[k])}</div><div class="bar ${p < C.exam.pass ? "warn" : ""}"><span style="width:${p}%"></span></div><div><b>${p}%</b> <span class="note">${c}/${t}</span></div></div>`; }).join("");
  renderReview("all");
}
function renderReview(f){
  const { items } = lastRes;
  document.querySelectorAll("#rFilters .chip").forEach(c => c.classList.toggle("on", c.dataset.f === f));
  const rows = items.map((it,i) => ({ it, i, q: byId[it.id] })).filter(({it,q}) => f === "all" || (f === "wrong" && it.pick !== q.a) || (f === "flag" && it.flag));
  $("rList").innerHTML = rows.length ? rows.map(({it,i,q}) => {
    const ok = it.pick === q.a;
    const opts = it.order.map((oi,pos) => { let c = "opt"; if (oi === q.a) c += " right"; else if (oi === it.pick) c += " wrong"; return `<div class="${c}" style="cursor:default"><span class="k">${L[pos]}</span><span>${esc(q.o[oi])}</span></div>`; }).join("");
    return `<div class="rev"><div style="display:flex;gap:8px;align-items:center;margin-bottom:6px;flex-wrap:wrap"><b>Q${i+1}</b><span class="tag ${ok ? "ok" : "no"}">${ok ? "Correct" : (it.pick === null ? "Unanswered" : "Missed")}</span><span class="pill">${esc(C.sections[q.s])}</span>${it.flag ? '<span class="pill" style="background:#fff3e0;color:var(--flag)">Flagged</span>' : ""}</div>
    <div style="margin-bottom:10px">${esc(q.q)}</div>${opts}<div class="explain">${esc(q.e)} ${q.p ? `<span class="note">— Course book p. ${esc(q.p)}</span>` : ""}</div></div>`;
  }).join("") : `<div class="empty">Nothing to show.</div>`;
}
$("rFilters").addEventListener("click", e => { const c = e.target.closest(".chip"); if (c) renderReview(c.dataset.f); });
$("againBtn").onclick = renderHome;
$("backToLesson").onclick = () => openLesson(fromLesson);

// ---------- learn ----------
function renderProg(){
  const n = C.lessons.filter(l => learned[l.id]).length, p = Math.round(100*n/C.lessons.length);
  $("homeProg").style.width = p + "%";
  $("homeProgTxt").textContent = `${n} of ${C.lessons.length} lessons complete`;
  $("learnSub").textContent = `${C.lessons.length} lessons, about ${C.lessons.reduce((a,l) => a+l.m, 0)} minutes of reading. ${n} of ${C.lessons.length} complete. ${C.lessons.some(l => l.p) ? "Page numbers point to the course book." : ""}`;
}
function renderLearn(){
  show("vLearn"); renderProg();
  $("learnMods").innerHTML = Object.entries(C.sections).map(([k,v]) => {
    const ls = C.lessons.map((l,i) => [l,i]).filter(([l]) => l.s === k);
    if (!ls.length) return "";
    return `<div class="secblock"><h2>${esc(v)}</h2>${ls.map(([l,i]) => `<button class="lrow ${learned[l.id] ? "done" : ""}" data-i="${i}"><span class="chk">${learned[l.id] ? "✓" : ""}</span><span><div class="lt1">${esc(l.t)}</div><div class="lt2">${l.m} min read · ${l.qs.length} practice questions${l.p ? ` · Book p. ${esc(l.p)}` : ""}</div></span><span class="go">${learned[l.id] ? "Review" : "Start"} →</span></button>`).join("")}</div>`;
  }).join("");
  $("learnCheat").innerHTML = Object.entries(C.sections).map(([k,v]) => {
    const rows = C.lessons.filter(l => l.s === k).flatMap(l => l.keys);
    return rows.length ? `<h3>${esc(v)}</h3><table>${rows.map(r => `<tr><td>${esc(r[0])}</td><td><b>${esc(r[1])}</b></td></tr>`).join("")}</table>` : "";
  }).join("");
}
document.querySelector("#vLearn .tabs").addEventListener("click", e => {
  const t = e.target.closest(".tab"); if (!t) return;
  document.querySelectorAll("#vLearn .tab").forEach(x => x.classList.toggle("on", x === t));
  $("learnMods").classList.toggle("hide", t.dataset.t !== "mods");
  $("learnCheat").classList.toggle("hide", t.dataset.t !== "cheat");
});
$("learnMods").addEventListener("click", e => { const r = e.target.closest(".lrow"); if (r) openLesson(+r.dataset.i); });
function openLesson(i){
  curLesson = i; const l = C.lessons[i];
  show("vLesson");
  $("lsSec").textContent = C.sections[l.s];
  $("lsMeta").textContent = `Lesson ${i+1} of ${C.lessons.length} · ${l.m} min` + (l.p ? ` · Course book p. ${l.p}` : "");
  $("lsTitle").textContent = l.t;
  $("lsBody").innerHTML = l.body;   // trusted course content shipped with the site
  $("lsKeys").innerHTML = l.keys.map(r => `<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td></tr>`).join("");
  $("lsTraps").innerHTML = l.traps.map(t => `<li>${esc(t)}</li>`).join("");
  $("lsPractice").textContent = `Practice ${l.qs.length} question${l.qs.length > 1 ? "s" : ""} on this lesson`;
  setDoneBtn();
  $("lsPrev").disabled = i === 0; $("lsNext").disabled = i === C.lessons.length-1;
}
function setDoneBtn(){
  const d = !!learned[C.lessons[curLesson].id];
  $("lsDone").textContent = d ? "✓ Completed" : "Mark lesson complete";
  $("lsDone").classList.toggle("gold", d); $("lsDone").classList.toggle("ghost", !d);
  $("lsDoneNote").textContent = "";
}
$("lsDone").onclick = async () => {
  const l = C.lessons[curLesson], done = !learned[l.id];
  if (done) learned[l.id] = new Date().toISOString(); else delete learned[l.id];
  setDoneBtn(); renderProg();
  try { await API.setProgress(C.id, l.id, done); }
  catch(e){ $("lsDoneNote").textContent = "Couldn't save progress: " + (e.message || e); }
};
$("lsPractice").onclick = () => practiceIds(C.lessons[curLesson].qs, curLesson);
$("lsPrev").onclick = () => { if (curLesson > 0) openLesson(curLesson-1); };
$("lsNext").onclick = () => { if (curLesson < C.lessons.length-1) openLesson(curLesson+1); };
$("backLearn").onclick = renderLearn;
$("goLearn").onclick = renderLearn;

// ---------- admin ----------
async function renderAdmin(){
  show("vAdmin");
  if (!C) setCourse(COURSES[0]);
  $("admCourse").innerHTML = COURSES.map((c,i) => `<option value="${i}" ${c === C ? "selected" : ""}>${esc(c.title)}${c.draft ? " (draft)" : ""}</option>`).join("");
  await loadTeam();
}
$("admCourse").onchange = async () => { setCourse(COURSES[+$("admCourse").value]); try { learned = await API.myProgress(C.id); } catch(e){} loadTeam(); };
async function loadTeam(){
  $("mTable").textContent = "Loading…";
  let inv, t;
  try { [inv, t] = await Promise.all([API.admin.invites(), API.admin.team(C.id)]); }
  catch(e){ $("mTable").textContent = "Couldn't load team data: " + (e.message || e); return; }
  const prof = Object.fromEntries(t.profiles.map(p => [p.email, p]));
  const people = inv.map(i => {
    const p = prof[i.email];
    const at = p ? t.attempts.filter(a => a.user_id === p.id && a.mode === "exam") : [];
    const ln = p ? t.progress.filter(g => g.user_id === p.id).length : 0;
    const best = at.length ? Math.max(...at.map(a => a.pct)) : null;
    const last = at[at.length-1];
    const sa = {}; at.forEach(a => Object.entries(a.sections||{}).forEach(([k,[c,n]]) => { sa[k] = sa[k]||[0,0]; sa[k][0]+=c; sa[k][1]+=n; }));
    const w = Object.entries(sa).sort((x,y) => x[1][0]/x[1][1] - y[1][0]/y[1][1])[0];
    return { email: i.email, name: i.full_name || (p && p.full_name) || "", role: i.role, joined: !!p, lastSeen: p && p.last_seen, ln, n: at.length, best, last, weak: w ? `${C.sections[w[0]]} (${Math.round(100*w[1][0]/w[1][1])}%)` : "—" };
  });
  const allAt = t.attempts.filter(a => a.mode === "exam");
  const tested = people.filter(p => p.n).length, passed = people.filter(p => p.best !== null && p.best >= C.exam.pass).length;
  $("mKpis").innerHTML = `<div class="kpi"><b>${people.length}</b><span>Invited</span></div><div class="kpi"><b>${people.filter(p => p.joined).length}</b><span>Signed in</span></div><div class="kpi"><b>${tested}</b><span>Took the exam</span></div><div class="kpi"><b>${passed}</b><span>Passed (≥${C.exam.pass}%)</span></div>`;
  people.sort((a,b) => (b.best ?? -1) - (a.best ?? -1));
  $("mTable").innerHTML = people.length ? `<table><tr><th>Name</th><th>Status</th><th>Lessons</th><th>Exams</th><th>Best</th><th>Latest</th><th>Weakest section</th><th>Last seen</th><th></th></tr>${people.map(p => `<tr>
    <td><b>${esc(p.name || p.email)}</b>${p.name ? `<div class="note">${esc(p.email)}</div>` : ""}</td>
    <td><span class="status ${p.joined ? "active" : "invited"}">${p.joined ? "Active" : "Invited"}</span>${p.role === "admin" ? ' <span class="status admin">Admin</span>' : ""}</td>
    <td>${p.ln}/${C.lessons.length}</td><td>${p.n}</td>
    <td style="font-weight:600;color:${p.best === null ? "inherit" : (p.best >= C.exam.pass ? "var(--good)" : "var(--bad)")}">${p.best === null ? "—" : p.best + "%"}</td>
    <td>${p.last ? p.last.pct + "%" : "—"}</td><td>${esc(p.weak)}</td><td>${dateStr(p.lastSeen)}</td>
    <td style="white-space:nowrap"><button class="linkbtn" data-act="send" data-e="${esc(p.email)}">${p.joined ? "Send link" : "Resend invite"}</button>${ME && p.email === ME.email ? "" : `<button class="linkbtn danger" data-act="rm" data-e="${esc(p.email)}">Remove</button>`}</td></tr>`).join("")}</table>` : '<div class="empty">No one invited yet.</div>';
  const ts = {}; allAt.forEach(a => Object.entries(a.sections||{}).forEach(([k,[c,n]]) => { ts[k] = ts[k]||[0,0]; ts[k][0]+=c; ts[k][1]+=n; }));
  $("mSecs").innerHTML = Object.keys(C.sections).filter(k => ts[k]).map(k => { const p = Math.round(100*ts[k][0]/ts[k][1]); return `<div class="secrow" style="grid-template-columns:1fr 90px 46px"><div style="font-size:13px">${esc(C.sections[k])}</div><div class="bar ${p < C.exam.pass ? "warn" : ""}"><span style="width:${p}%"></span></div><b style="font-size:13px">${p}%</b></div>`; }).join("") || '<div class="empty">No exams taken yet.</div>';
  const mc = {}; allAt.forEach(a => (a.missed||[]).forEach(id => mc[id] = (mc[id]||0)+1));
  const top = Object.entries(mc).filter(([id]) => byId[id]).sort((a,b) => b[1]-a[1]).slice(0,8);
  $("mMissed").innerHTML = top.length ? top.map(([id,n]) => `<div style="border-bottom:1px solid var(--line);padding:8px 0;font-size:13px"><b>${n}×</b> <span class="pill">${esc(C.sections[byId[id].s])}</span><div style="margin-top:3px">${esc(byId[id].q.slice(0,150))}${byId[id].q.length > 150 ? "…" : ""}</div></div>`).join("") : '<div class="empty">No misses recorded.</div>';
}
$("mTable").addEventListener("click", async e => {
  const b = e.target.closest(".linkbtn"); if (!b) return;
  const email = b.dataset.e;
  if (b.dataset.act === "send"){
    b.disabled = true;
    try { await API.admin.sendInvite(email); b.textContent = "Sent ✓"; } catch(err){ b.textContent = "Failed"; b.title = err.message; }
  } else {
    confirmBox("Remove " + email + "?", "They'll lose access, and their lesson progress and exam history will be deleted.", async () => {
      try { await API.admin.removeInvite(email); loadTeam(); } catch(err){ alert(err.message); }
    });
  }
});
$("invBtn").onclick = async () => {
  const role = $("invRole").value;
  const rows = $("invList").value.split(/\n+/).map(l => l.trim()).filter(Boolean).map(l => {
    const m = l.match(/^(.*?)[,;\t]\s*([^\s,;]+@[^\s,;]+)$/) || l.match(/^(.*?)\s*<([^>]+@[^>]+)>$/);
    const email = (m ? m[2] : l).trim().toLowerCase();
    return { name: m ? m[1].trim().replace(/^"|"$/g, "") : "", email, role };
  });
  const bad = rows.filter(r => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r.email));
  if (!rows.length){ msg($("invMsg"), "Add at least one email.", false); return; }
  if (bad.length){ msg($("invMsg"), "These don't look like emails: " + bad.map(r => r.email).join(", "), false); return; }
  $("invBtn").disabled = true; msg($("invMsg"), "");
  try {
    await API.admin.addInvites(rows);
    let sent = 0, fails = [];
    if ($("invSend").checked && API.mode !== "demo"){
      for (const r of rows){ try { await API.admin.sendInvite(r.email); sent++; } catch(err){ fails.push(r.email + " (" + err.message + ")"); } }
    }
    $("invList").value = "";
    msg($("invMsg"), `Invited ${rows.length}.` + ($("invSend").checked && API.mode !== "demo" ? ` Sign-in emails sent: ${sent}.` : "") + (fails.length ? " Not sent: " + fails.join("; ") : ""), !fails.length);
    loadTeam();
  } catch(err){ msg($("invMsg"), err.message || String(err), false); }
  $("invBtn").disabled = false;
};

// ---------- nav ----------
function leaveThen(fn){
  if (S){ confirmBox("Leave this " + (S.mode === "exam" ? "exam" : "practice") + "?", S.mode === "exam" ? "Your exam is saved on this device and the timer keeps running. You can resume it from the course page." : "Practice progress won't be saved.", () => { clearInterval(tick); S = null; fn(); }); }
  else fn();
}
$("navHome").onclick = () => leaveThen(() => COURSES.length === 1 ? renderHome() : renderCourses());
$("navLearn").onclick = () => leaveThen(renderLearn);
$("navAdmin").onclick = () => leaveThen(renderAdmin);
$("startExam").onclick = () => { const s = readSaved(); if (s && s.deadline > Date.now()) confirmBox("Start a new exam?", "You have an exam in progress. Starting a new one will throw it out.", () => { clearSaved(); startExam(); }); else startExam(); };
$("resumeBtn").onclick = () => { S = readSaved(); if (S) runExam(); };
$("startPractice").onclick = startPractice;

boot();
})();
