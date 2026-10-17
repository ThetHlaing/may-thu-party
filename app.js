/* ────────────────────────────────────────────────────────────
   May Thu's Birthday Party — app logic
   Pages: #/            intro cover (tap the image to continue)
          #/games       games list
          #/game/<id>   game detail
          #/scores      marking board + summary table
   Scores are saved in the browser (localStorage) so a refresh
   won't lose them.
──────────────────────────────────────────────────────────── */

const app = document.getElementById("app");
const topbar = document.getElementById("topbar");
const STORAGE_KEY = "maythu-party-scores-v2";

// ── Score storage ───────────────────────────────────────────
// One running total per person across all games.
// shape: { [personIndex]: number }
function loadScores() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch { return {}; }
}
function saveScores(s) { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); }
function getScore(scores, p) { return scores[p] || 0; }
function setScore(scores, p, v) { scores[p] = Math.max(0, v); saveScores(scores); }

// ── Helpers ─────────────────────────────────────────────────
function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
const COLORS = ["#ff5fa2", "#ffb347", "#7ec8e3", "#8fd694", "#c5b3ff", "#ff8c94", "#f9c74f", "#43aa8b", "#577590", "#f3722c", "#90be6d"];
function initials(name) {
  return name.trim().split(/\s+/).slice(0, 2).map(w => (/^\d+$/.test(w) ? w : w[0])).join("").toUpperCase();
}
function avatarHTML(person, i) {
  if (person.photo) {
    return `<div class="avatar" data-p="${i}" style="background-image:url('${esc(person.photo)}')"></div>`;
  }
  return `<div class="avatar" data-p="${i}" style="background:${COLORS[i % COLORS.length]}">${esc(initials(person.name))}</div>`;
}
function setNav(name) {
  document.querySelectorAll("[data-nav]").forEach(a => a.classList.toggle("active", a.dataset.nav === name));
}
function burst(x, y, n = 18) {
  const emojis = ["🎉", "✨", "💖", "⭐", "🎊", "💛", "🌸"];
  for (let k = 0; k < n; k++) {
    const s = document.createElement("span");
    s.className = "spark";
    s.textContent = emojis[k % emojis.length];
    const ang = (Math.PI * 2 * k) / n, dist = 80 + Math.random() * 120;
    s.style.left = x + "px"; s.style.top = y + "px";
    s.style.setProperty("--dx", Math.cos(ang) * dist + "px");
    s.style.setProperty("--dy", Math.sin(ang) * dist + "px");
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 1000);
  }
}

// ── Page: Intro cover ───────────────────────────────────────
function renderIntro() {
  topbar.hidden = true;
  document.body.classList.add("intro-mode");
  app.innerHTML = `
    <div class="intro" id="intro">
      <img class="cover" src="${esc(window.COVER_IMAGE || "")}" alt="May's birthday party cover">
      <div class="tap-hint">👆 Tap to start the party</div>
    </div>`;
  document.getElementById("intro").addEventListener("click", e => {
    burst(e.clientX, e.clientY, 24);
    setTimeout(() => { location.hash = "#/games"; }, 350);
  });
}

// ── Page: Games list ────────────────────────────────────────
function renderHome() {
  setNav("home");
  app.innerHTML = `
    <section class="hero">
      <div class="big">🎉🎂🎈</div>
      <h1 class="grad">Happy Birthday May Thu!</h1>
    </section>
    <div class="game-grid">
      ${GAMES.map((g, i) => `
        <a class="game-card c${i % 5}" href="#/game/${g.id}">
          <div class="emoji">${g.emoji || "🎮"}</div>
          <div class="body">
            <div class="num">GAME ${i + 1}</div>
            <div class="title">${esc(g.title)}</div>
            ${g.subtitle ? `<div class="sub">${esc(g.subtitle)}</div>` : ""}
          </div>
          <div class="arrow">›</div>
        </a>`).join("")}
    </div>
    <p style="text-align:center;margin-top:34px">
      <a class="btn" href="#/scores">🏆 Open the score board</a>
    </p>`;
}

// ── Page: Game detail ───────────────────────────────────────
function renderGame(id) {
  setNav("home");
  const game = GAMES.find(g => String(g.id) === String(id));
  if (!game) { app.innerHTML = `<p>Game not found. <a href="#/games">Back</a></p>`; return; }
  const idx = GAMES.indexOf(game);
  const prev = GAMES[idx - 1], next = GAMES[idx + 1];

  const header = `
    <div class="toolbar">
      <a class="back" href="#/games">‹ All games</a>
      <div class="spacer"></div>
      <a class="btn ghost small" href="#/scores">🏆 Give marks</a>
      ${prev ? `<a class="btn ghost small" href="#/game/${prev.id}">‹ Game ${idx}</a>` : ""}
      ${next ? `<a class="btn ghost small" href="#/game/${next.id}">Game ${idx + 2} ›</a>` : ""}
    </div>
    <div class="game-head">
      <div class="num">GAME ${idx + 1}</div>
      <h1 class="grad">${game.emoji || ""} ${esc(game.title)}</h1>
      ${game.subtitle ? `<p class="subtitle">${esc(game.subtitle)}</p>` : ""}
    </div>`;

  app.innerHTML = header + `<div id="stage"></div>`;
  if (game.type === "quiz") initQuiz(game);
  else if (game.type === "steps") initSteps(game);
  else renderTitleOnly(game);
}

// Quiz: ONE question at a time, big for the TV
function initQuiz(game) {
  const stage = document.getElementById("stage");
  const picks = {};        // question index -> selected option index
  let i = 0;
  const n = game.questions.length;

  function draw() {
    const q = game.questions[i];
    stage.innerHTML = `
      <div class="quiz-stage">
        <div class="progress">
          ${game.questions.map((_, k) => `<span class="${k < i ? "done" : k === i ? "now" : ""}"></span>`).join("")}
        </div>
        <div class="counter">Question ${i + 1} / ${n}</div>
        <div class="qtext">${esc(q.q)}</div>
        <div class="options ${q.options.some(o => o && typeof o === "object" && (o.img || o.emoji || o.color)) ? "visual" : ""}">
          ${q.options.map((o, k) => {
            const opt = typeof o === "string" ? { text: o } : o;
            let media = "";
            if (opt.img)   media = `<div class="opt-media" style="background-image:url('${esc(opt.img)}')"></div>`;
            else if (opt.color) media = `<div class="opt-media swatch" style="background:${esc(opt.color)}"></div>`;
            else if (opt.emoji) media = `<div class="opt-media icon">${opt.emoji}</div>`;
            return `
            <button class="option ${picks[i] === k ? "selected" : ""}" data-k="${k}">
              <span class="letter">${"ABC"[k] || k + 1}</span>
              ${media}
              <span class="opt-text">${esc(opt.text)}</span>
            </button>`;
          }).join("")}
        </div>
        <div class="quiz-nav">
          <button class="btn ghost" id="qPrev" ${i === 0 ? "disabled" : ""}>‹ Previous</button>
          <button class="btn" id="qNext">${i === n - 1 ? "Finish 🎉" : "Next ›"}</button>
        </div>
        <div class="hint">Tap an option to highlight it · use ← → keys on a keyboard</div>
      </div>`;
    stage.querySelectorAll(".option").forEach(b => b.addEventListener("click", e => {
      const k = Number(b.dataset.k);
      picks[i] = picks[i] === k ? undefined : k;
      stage.querySelectorAll(".option").forEach(o => o.classList.toggle("selected", Number(o.dataset.k) === picks[i]));
      if (picks[i] !== undefined) burst(e.clientX, e.clientY, 10);
    }));
    document.getElementById("qPrev").addEventListener("click", prevQ);
    document.getElementById("qNext").addEventListener("click", nextQ);
  }
  function prevQ() { if (i > 0) { i--; draw(); } }
  function nextQ() {
    if (i < n - 1) { i++; draw(); }
    else {
      burst(window.innerWidth / 2, window.innerHeight / 2, 30);
      stage.innerHTML = `
        <div class="quiz-stage">
          <div class="emoji" style="font-size:6rem">🏆</div>
          <div class="qtext">That's all ${n} questions!</div>
          <div class="hint">Who knows May Thu the best?</div>
          <div class="quiz-nav">
            <button class="btn ghost" id="qAgain">↺ Start again</button>
            <a class="btn" href="#/scores">🏆 Give marks</a>
          </div>
        </div>`;
      document.getElementById("qAgain").addEventListener("click", () => { i = 0; draw(); });
    }
  }
  window.onkeydown = e => {
    if (e.key === "ArrowRight" || e.key === " ") nextQ();
    if (e.key === "ArrowLeft") prevQ();
  };
  draw();
}

function renderTitleOnly(game) {
  document.getElementById("stage").innerHTML = `
    <div class="stage title-stage" style="cursor:default">
      <div class="emoji">${game.emoji || "🎮"}</div>
      <div class="task">${esc(game.title)}</div>
      ${game.subtitle ? `<div class="note">${esc(game.subtitle)}</div>` : ""}
      ${game.note ? `<div class="note">${esc(game.note)}</div>` : ""}
    </div>`;
}

// Parcel game: click the stage to reveal the next step
function initSteps(game) {
  const stage = document.getElementById("stage");
  let i = -1;              // -1 = intro screen
  let timer = null, remaining = 0;

  function stopTimer() { if (timer) clearInterval(timer); timer = null; }

  function draw() {
    stopTimer();
    if (i < 0) {
      stage.innerHTML = `
        <div class="stage">
          <div class="emoji">${game.emoji || "🎁"}</div>
          <div class="task">${esc(game.title)}</div>
          <div class="hint">Tap anywhere to show the first task</div>
        </div>`;
      return;
    }
    if (i >= game.steps.length) {
      stage.innerHTML = `
        <div class="stage">
          <div class="emoji">🎊</div>
          <div class="task">All done!</div>
          <div class="hint">Tap to start over</div>
        </div>`;
      return;
    }
    const s = game.steps[i];
    stage.innerHTML = `
      <div class="stage">
        <div class="task">${esc(s.text)}</div>
        ${s.note ? `<div class="note">${esc(s.note)}</div>` : ""}
        ${s.seconds ? `<div class="timer" id="timer">${s.seconds}</div>
                       <button class="btn" id="startTimer">▶ Start ${s.seconds} sec</button>` : ""}
        <div class="hint">Tap anywhere for the next one</div>
      </div>`;
    const btn = document.getElementById("startTimer");
    if (btn) btn.addEventListener("click", ev => { ev.stopPropagation(); startTimer(s.seconds); });
  }

  function startTimer(sec) {
    stopTimer();
    remaining = sec;
    const el = document.getElementById("timer");
    const btn = document.getElementById("startTimer");
    if (btn) btn.textContent = "⟳ Restart";
    el.classList.remove("done");
    el.textContent = remaining;
    timer = setInterval(() => {
      remaining -= 1;
      el.textContent = remaining;
      if (remaining <= 0) { stopTimer(); el.textContent = "⏰ TIME!"; el.classList.add("done"); }
    }, 1000);
  }

  stage.addEventListener("click", e => {
    if (e.target.closest("button")) return;
    i = i >= game.steps.length ? -1 : i + 1;
    draw();
    if (i >= 0 && i < game.steps.length) burst(e.clientX, e.clientY, 12);
  });
  draw();
}

// ── Page: Scores ────────────────────────────────────────────
function renderScores() {
  setNav("scores");
  const scores = loadScores();
  let step = Number(sessionStorage.getItem("scoreStep")) || 1;

  function draw() {
    sessionStorage.setItem("scoreStep", step);

    app.innerHTML = `
      <div class="game-head">
        <h1 class="grad">🏆 Score Board</h1>
        <p class="subtitle">Tap a photo to add marks. Use − / + to adjust. Marks carry across all games.</p>
      </div>

      <div class="toolbar glass">
        <label>Tap adds</label>
        <div class="step-pick">
          ${[1, 2, 3, 5].map(n => `<button data-step="${n}" class="${n === step ? "active" : ""}">+${n}</button>`).join("")}
        </div>
        <div class="spacer"></div>
        <button class="btn danger small" id="resetAll">Reset all</button>
      </div>

      <div class="people-grid">
        ${PEOPLE.map((p, i) => `
          <div class="person">
            ${avatarHTML(p, i)}
            <div class="name">${esc(p.name)}</div>
            <div class="score" id="s-${i}">${getScore(scores, i)}</div>
            <div class="adjust">
              <button data-adj="-1" data-p="${i}" aria-label="minus">−</button>
              <button data-adj="1" data-p="${i}" aria-label="plus">+</button>
            </div>
          </div>`).join("")}
      </div>

      <h2>Summary</h2>
      <div id="podium"></div>
      <div class="table-wrap glass">
        <table id="summary"></table>
      </div>
      <p class="muted" style="margin-top:12px">Scores are saved on this device automatically.</p>`;

    document.querySelectorAll("[data-step]").forEach(b => b.addEventListener("click", () => { step = Number(b.dataset.step); draw(); }));
    document.getElementById("resetAll").addEventListener("click", () => {
      if (confirmReset()) { Object.keys(scores).forEach(k => delete scores[k]); saveScores(scores); draw(); }
    });
    drawTable();
  }

  // two-click confirmation for "Reset all" (no browser dialogs)
  let armed = false;
  function confirmReset() {
    const btn = document.getElementById("resetAll");
    if (armed) { armed = false; return true; }
    armed = true;
    btn.textContent = "Tap again to confirm";
    setTimeout(() => { armed = false; if (document.body.contains(btn)) btn.textContent = "Reset all"; }, 2500);
    return false;
  }

  function change(p, delta, origin) {
    setScore(scores, p, getScore(scores, p) + delta);
    document.getElementById(`s-${p}`).textContent = getScore(scores, p);
    drawTable();
    if (origin && delta > 0) floatText(origin, `+${delta}`);
  }

  // Teams: prizes go to couples. Team score = sum of members' marks × multiplier.
  function buildTeams() {
    return (window.TEAMS || []).map(t => {
      const members = t.members
        .map(n => PEOPLE.findIndex(p => p.name === n))
        .filter(i => i >= 0);
      const mult = t.multiplier || 1;
      const raw = members.reduce((a, i) => a + getScore(scores, i), 0);
      return { members, mult, raw, total: raw * mult, name: members.map(i => PEOPLE[i].name).join(" & ") };
    });
  }
  function photoHTML(i, cls) {
    const p = PEOPLE[i];
    return p.photo
      ? `<div class="${cls}" style="background-image:url('${esc(p.photo)}')"></div>`
      : `<div class="${cls}" style="background:${COLORS[i % COLORS.length]}">${esc(initials(p.name))}</div>`;
  }

  function drawTable() {
    const teams = buildTeams();
    const order = teams.map((_, k) => k).sort((a, b) => teams[b].total - teams[a].total);
    const best = Math.max(0, ...teams.map(t => t.total));

    // Competition ranking: equal totals share a place (1, 1, 3, 4 ...)
    const rankOf = {};
    order.forEach((k, idx) => {
      const prev = order[idx - 1];
      rankOf[k] = (prev !== undefined && teams[prev].total === teams[k].total) ? rankOf[prev] : idx + 1;
    });
    const suffix = r => r + (["st", "nd", "rd"][r - 1] || "th");

    // Podium: every team with marks placed 1st, 2nd or 3rd (ties share a step)
    const top = order.filter(k => teams[k].total > 0 && rankOf[k] <= 3);
    const podium = document.getElementById("podium");
    if (top.length === 0) {
      podium.innerHTML = `<div class="podium-empty glass">🏅 Start giving marks to see the top 3 couples here</div>`;
    } else {
      const medal = { 1: "🥇", 2: "🥈", 3: "🥉" };
      const pod = (k) => {
        const t = teams[k], r = rankOf[k];
        return `
          <div class="pod r${r}">
            <div class="medal">${medal[r]}</div>
            <div class="pod-imgs n${t.members.length}">${t.members.map(i => photoHTML(i, "pod-img")).join("")}</div>
            <div class="pod-name">${esc(t.name)}</div>
            <div class="pod-score">${t.total} <span>pts</span></div>
            <div class="pod-base">${suffix(r)}${top.filter(x => rankOf[x] === r).length > 1 ? " · tie" : ""}</div>
          </div>`;
      };
      const group = r => top.filter(k => rankOf[k] === r).map(pod).join("");
      podium.innerHTML = `<div class="podium">${group(2)}${group(1)}${group(3)}</div>`;
    }

    document.getElementById("summary").innerHTML = `
      <thead><tr><th>#</th><th>Couple</th><th>Marks</th><th>Team total</th></tr></thead>
      <tbody>
        ${order.map(k => {
          const t = teams[k];
          return `
          <tr class="${t.total === best && best > 0 ? "leader" : ""}">
            <td class="rank">${rankOf[k]}${top.filter(x => rankOf[x] === rankOf[k]).length > 1 ? "=" : ""}</td>
            <td class="who">
              <span class="who-imgs">${t.members.map(i => PEOPLE[i].photo ? `<img src="${esc(PEOPLE[i].photo)}" alt="">` : "").join("")}</span>
              ${esc(t.name)}${t.mult > 1 ? ` <span class="tag">solo ×${t.mult}</span>` : ""}
            </td>
            <td class="marks">${t.members.map(i => `${esc(PEOPLE[i].name.split(" ")[0])} ${getScore(scores, i)}`).join(" + ")}${t.mult > 1 ? ` × ${t.mult}` : ""}</td>
            <td class="total">${t.total}</td>
          </tr>`;
        }).join("")}
      </tbody>`;
  }

  // delegated handlers for avatars and +/- buttons
  app.onclick = e => {
    const av = e.target.closest(".avatar");
    if (av) {
      av.classList.add("bump"); setTimeout(() => av.classList.remove("bump"), 120);
      change(Number(av.dataset.p), step, av);
      return;
    }
    const adj = e.target.closest("[data-adj]");
    if (adj) change(Number(adj.dataset.p), Number(adj.dataset.adj));
  };

  draw();
}

function floatText(el, text) {
  const r = el.getBoundingClientRect();
  const f = document.createElement("div");
  f.className = "floating";
  f.textContent = text;
  f.style.left = (r.left + r.width / 2 - 16) + "px";
  f.style.top = (r.top) + "px";
  document.body.appendChild(f);
  setTimeout(() => f.remove(), 800);
}

// ── Router ──────────────────────────────────────────────────
function route() {
  app.onclick = null;                      // clear page-specific handlers
  window.onkeydown = null;
  topbar.hidden = false;
  document.body.classList.remove("intro-mode");
  const hash = location.hash || "#/";
  const [path, query] = hash.slice(1).split("?");
  const parts = path.split("/").filter(Boolean);
  if (parts.length === 0) renderIntro();
  else if (parts[0] === "game" && parts[1]) renderGame(parts[1]);
  else if (parts[0] === "scores") renderScores();
  else renderHome();
  window.scrollTo(0, 0);
}
window.addEventListener("hashchange", route);
route();
