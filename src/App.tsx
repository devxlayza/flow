// @ts-nocheck — lógica ainda imperativa, portada do protótipo estático (próximo passo: refatorar em componentes e hooks).
import { useEffect, useRef } from "react";

const HTML = `<div class="bg"><div class="bl b1"></div><div class="bl b2"></div></div>
<div class="grain"></div>
<div class="v l">Streaming UI · Componentes gerados</div>
<div class="v r">Protótipo de portfólio · Frontend</div>
<div class="app" id="app">
  <header class="top">
    <div class="logo">fluxo<i>✦</i></div>
    <div class="meta">Sessão 01 / 2026·10·18</div>
    <button id="new" type="button">↺ Nova conversa</button>
  </header>
  <div id="log" aria-live="polite">
    <div class="col" id="col">
      <section class="hero">
        <p class="eyebrow">Interface generativa · 2026</p>
        <h1>Pergunte.<br>A interface<br>se monta<span>✦</span></h1>
        <p class="sub">Respostas em streaming que viram tabelas, formulários e painéis de verdade, com cancelamento e retry tratados.</p>
        <div class="chips">
          <button type="button" data-q="Resumo de vendas do trimestre">Resumo de vendas do trimestre</button>
          <button type="button" data-q="Agendar revisão de projeto">Agendar revisão de projeto</button>
          <button type="button" data-q="Status dos serviços agora">Status dos serviços agora</button>
        </div>
      </section>
    </div>
  </div>
  <div class="composer">
    <div class="box">
      <input id="in" type="text" autocomplete="off" aria-label="Mensagem" placeholder="Peça um resumo, um agendamento, um status…">
      <button class="send" id="go" type="button" aria-label="Enviar"></button>
    </div>
  </div>
  <div class="foot">Protótipo · respostas simuladas no navegador · digite “erro” para ver o retry</div>
</div>`;

function init(host: HTMLElement): () => void {
  const __t: number[] = [];
  const __l: [string, any][] = [];
  const __every = (f: any, ms: number) => {
    __t.push(window.setInterval(f, ms));
  };
  const __on = (ev: string, f: any) => {
    document.addEventListener(ev, f);
    __l.push([ev, f]);
  };
  const $ = (s) => host.querySelector(s),
    log = $("#log"),
    col = $("#col"),
    app = $("#app"),
    inp = $("#in"),
    go = $("#go");
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  let busy = false,
    abort = false,
    last = "";
  const PX = `<svg class="px" viewBox="0 0 9 8" shape-rendering="crispEdges" aria-hidden="true"><path d="M4 0h1v1H4zM3 1h1v1H3zM5 1h1v1H5zM3 2h1v1H3zM5 2h1v1H5zM2 3h1v1H2zM6 3h1v1H6zM2 4h1v1H2zM6 4h1v1H6zM1 5h1v1H1zM7 5h1v1H7zM0 6h9v1H0zM4 2h1v2H4zM4 5h1v1H4z"/></svg>`;
  const ARROW = `<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="square"/></svg>`;
  const STOP = `<svg viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12"/></svg>`;
  const sales = () => {
    const d = [
        ["Sudeste", 482],
        ["Nordeste", 318],
        ["Sul", 261],
        ["Centro-Oeste", 174],
      ],
      mx = 482;
    return `<h3>Vendas · 3º trimestre</h3><table><thead><tr><th>Região</th><th>R$ mil</th><th></th></tr></thead><tbody>${d.map(([n, v]) => `<tr><td>${n}</td><td>${v.toLocaleString("pt-BR")}</td><td><div class="bar" style="width:${Math.round((v / mx) * 100)}%"></div></td></tr>`).join("")}</tbody></table>`;
  };
  const sched = () =>
    `<h3>Revisão de projeto · 45 min</h3><div class="slots" role="group" aria-label="Horários">${["Qua · 10h00", "Qui · 14h30", "Sex · 09h00"].map((s) => `<button type="button" class="slot" aria-pressed="false" data-act="slot">${s}</button>`).join("")}</div><button type="button" class="go" data-act="confirm">Confirmar horário</button><div class="hint"></div>`;
  const status = () => {
    const s = [
      ["API Gateway", "99,98%", 1],
      ["Autenticação", "99,95%", 1],
      ["Fila de e-mails", "latência 4,2 s", 0],
      ["Banco de dados", "99,99%", 1],
    ];
    return `<h3>Serviços · agora</h3>${s.map(([n, v, o]) => `<div class="svc">${o ? `<span class="ok"></span>` : PX}<span class="${o ? "" : "warn"}">${n}</span><small>${v}</small></div>`).join("")}`;
  };
  function pick(q) {
    q = q.toLowerCase();
    if (/fila|investig/.test(q))
      return [
        "A fila de e-mails acumulou 1.240 mensagens depois do último deploy. Sugiro reprocessar em lotes de 200 e acompanhar a latência a cada minuto.",
      ];
    if (/venda|receita|trimestre|resumo/.test(q))
      return [
        "Aqui está o resumo do trimestre por região. O Sudeste lidera em volume, e o Nordeste é o que mais se aproxima da meta.",
        { tool: "render_table", html: sales },
        "Quer que eu detalhe alguma região ou compare com o trimestre anterior?",
      ];
    if (/agend|revis|reuni|hor[aá]rio/.test(q))
      return [
        "Encontrei três horários livres para a revisão. Escolha um e eu confirmo com o time.",
        { tool: "render_form", html: sched },
      ];
    if (/status|servi|sa[uú]de|api/.test(q))
      return [
        "Verifiquei os serviços agora há pouco. Um deles precisa de atenção.",
        { tool: "render_status", html: status },
        "Posso investigar a fila de e-mails se você quiser.",
      ];
    return [
      "Posso montar tabelas, formulários e painéis de status direto na conversa. Experimente pedir um resumo de vendas, agendar uma revisão ou ver o status dos serviços.",
    ];
  }
  const keep = () => {
    if (log.scrollHeight - log.scrollTop - log.clientHeight < 160)
      log.scrollTop = log.scrollHeight;
  };
  const hm = () =>
    new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  function msg(cls, who) {
    const m = document.createElement("article");
    m.className = "m " + cls;
    if (who)
      m.innerHTML = `<div class="who">${who} · ${hm()}</div><div class="body"></div>`;
    col.append(m);
    return m;
  }
  async function typeText(b, text, fail) {
    const p = document.createElement("p");
    p.className = "t";
    b.append(p);
    const c = document.createElement("span");
    c.className = "caret";
    p.append(c);
    const w = text.split(" "),
      n = fail ? Math.ceil(w.length * 0.5) : w.length;
    for (let i = 0; i < n; i++) {
      if (abort) {
        c.remove();
        return;
      }
      c.before((i ? " " : "") + w[i]);
      keep();
      await sleep(24 + Math.random() * 34);
    }
    c.remove();
    if (fail) throw new Error("stream");
  }
  async function tool(b, s) {
    const d = document.createElement("div");
    d.className = "tool";
    d.innerHTML = `<span class="d"></span>${s.tool}<em>executando…</em>`;
    b.append(d);
    keep();
    const ms = Math.round(380 + Math.random() * 420);
    await sleep(ms);
    if (abort) {
      d.remove();
      return;
    }
    d.classList.add("done");
    d.querySelector("em").textContent = ms + " ms";
    const g = document.createElement("div");
    g.className = "gen";
    g.innerHTML = s.html();
    b.append(g);
    keep();
  }
  function note(m, txt, warn) {
    const n = document.createElement("div");
    n.className = "note";
    n.innerHTML = `${warn ? PX : ""}<span>${txt}</span><button type="button" class="act" data-act="retry">Tentar de novo</button>`;
    m.querySelector(".body").append(n);
    keep();
  }
  function ui() {
    app.classList.toggle("live", busy);
    go.classList.toggle("stop", busy);
    go.innerHTML = busy ? STOP : ARROW;
    go.setAttribute("aria-label", busy ? "Parar resposta" : "Enviar");
  }
  async function run(q, retry) {
    if (busy) return;
    busy = true;
    abort = false;
    last = q;
    app.classList.add("started");
    ui();
    if (!retry) {
      const u = msg("u");
      u.textContent = q;
    }
    const m = msg("a", "fluxo"),
      b = m.querySelector(".body"),
      steps = pick(q),
      fail = /erro/i.test(q) && !retry;
    try {
      for (let i = 0; i < steps.length && !abort; i++) {
        const s = steps[i];
        if (typeof s === "string") await typeText(b, s, fail && i === 0);
        else await tool(b, s);
      }
      if (abort) note(m, "Resposta interrompida.");
    } catch (e) {
      note(m, "A conexão caiu durante o stream.", true);
    }
    busy = false;
    ui();
  }
  function send() {
    const v = inp.value.trim();
    if (!v || busy) return;
    inp.value = "";
    run(v);
  }
  go.onclick = () => (busy ? (abort = true) : send());
  inp.onkeydown = (e) => {
    if (e.key === "Enter") send();
  };
  $("#new").onclick = () => {
    abort = true;
    [...col.querySelectorAll(".m")].forEach((x) => x.remove());
    app.classList.remove("started");
    log.scrollTop = 0;
  };
  host
    .querySelectorAll(".chips button")
    .forEach((b) => (b.onclick = () => run(b.dataset.q)));
  col.addEventListener("click", (e) => {
    const t = e.target.closest("[data-act]");
    if (!t) return;
    const a = t.dataset.act,
      card = t.closest(".gen");
    if (a === "retry") {
      t.closest(".m").remove();
      run(last, true);
    }
    if (a === "slot") {
      card
        .querySelectorAll(".slot")
        .forEach((s) => s.setAttribute("aria-pressed", s === t));
      card.querySelector(".hint").textContent = "";
    }
    if (a === "confirm") {
      const s = card.querySelector('.slot[aria-pressed="true"]');
      if (!s) {
        card.querySelector(".hint").textContent =
          "Escolha um horário primeiro.";
        return;
      }
      card.innerHTML = `<h3>Confirmado ✦</h3><p class="t">Revisão marcada para <b>${s.textContent}</b>. O convite foi enviado ao time.</p>`;
    }
  });
  ui();
  return () => {
    __t.forEach((i) => clearInterval(i));
    __l.forEach(([e, f]) => document.removeEventListener(e, f));
  };
}

export default function App() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    document.title = "Fluxo — Interface de IA com streaming";
    el.innerHTML = HTML;
    return init(el);
  }, []);
  return <div ref={ref} className="fluxo" />;
}
