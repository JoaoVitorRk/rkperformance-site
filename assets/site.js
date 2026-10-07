/* RK Performance — site v4 · interações (vanilla, sem dependências) */
(function () {
  'use strict';
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.replace('no-js', 'js');

  /* saudação + relógio (horário de Guarapuava) */
  const fmt = new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo' });
  const hourBR = () => Number(new Intl.DateTimeFormat('en-US', { hour: 'numeric', hour12: false, timeZone: 'America/Sao_Paulo' }).format(new Date()));
  const greet = $('#greet');
  if (greet) { const h = hourBR(); greet.textContent = h < 5 ? 'Boa madrugada' : h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite'; }
  const clock = $('#clock');
  const tick = () => { if (clock) clock.textContent = fmt.format(new Date()); };
  tick(); setInterval(tick, 30000);
  const year = $('#year'); if (year) year.textContent = new Date().getFullYear();

  /* menu mobile */
  const burger = $('#burger'), menu = $('#menu');
  const setMenu = (open) => {
    if (!menu) return;
    menu.classList.toggle('open', open); burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  };
  burger && burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  $('#menuClose') && $('#menuClose').addEventListener('click', () => setMenu(false));
  $$('#menu a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  /* progresso, topo, seção ativa, tema do cabeçalho (claro × escuro) */
  const header = $('#header'), progress = $('#progress'), totop = $('#totop'), ring = totop && totop.querySelector('circle.ring');
  const navLinks = $$('nav.main a');
  const sections = $$('main section[id]');
  const navMap = { sites: 'sites', sistemas: 'sites', ia: 'sites', trafego: 'sites', demo: 'metodo', metodo: 'metodo', projetos: 'projetos', sobre: 'sobre', faq: 'faq' };
  let ticking = false;
  const onScroll = () => {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY, max = document.documentElement.scrollHeight - innerHeight;
      const p = max > 0 ? y / max : 0;
      if (progress) progress.style.width = (p * 100).toFixed(2) + '%';
      if (totop) { totop.classList.toggle('show', y > 700); if (ring) ring.style.strokeDashoffset = String(138 - 138 * p); }
      const hh = header ? header.offsetHeight : 80;
      let cur = sections[0] && sections[0].id, under = null;
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        if (r.top <= innerHeight * 0.4) cur = s.id;
        if (r.top <= hh && r.bottom > hh) under = s;
      }
      if (header) {
        const light = under ? under.classList.contains('light') : true;
        header.classList.toggle('on-light', light);
        header.classList.toggle('solid', !light && y > 40);
      }
      navLinks.forEach(a => a.classList.toggle('active', a.dataset.nav === navMap[cur]));
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  totop && totop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));

  /* faixa de credenciais — rAF em vez de @keyframes */
  const track = $('#strip');
  if (track && !reduce) {
    let x = 0, last = performance.now(), half = 0;
    const measure = () => { half = track.scrollWidth / 2; };
    measure(); window.addEventListener('resize', measure);
    const step = (t) => { const dt = Math.min(48, t - last); last = t; x -= dt * 0.035; if (half && -x >= half) x += half; track.style.transform = 'translate3d(' + x.toFixed(2) + 'px,0,0)'; requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }

  /* reveal on scroll + gatilhos por seção */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      if (en.target.id === 'chat') playChat();
      if (en.target.id === 'code') typeCode();
      if (en.target.dataset.count) countUp(en.target);
      io.unobserve(en.target);
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
  $$('.reveal, #chat, #dash, #code, [data-count]').forEach(el => io.observe(el));

  /* contadores */
  function countUp(el) {
    const end = Number(el.dataset.count), pre = el.dataset.prefix || '', suf = el.dataset.suffix || '';
    if (reduce) { el.textContent = pre + end + suf; return; }
    const t0 = performance.now(), dur = 1400;
    const f = (t) => { const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3); el.textContent = pre + Math.round(end * e).toLocaleString('pt-BR') + suf; if (k < 1) requestAnimationFrame(f); };
    requestAnimationFrame(f);
  }

  /* editor de código digitando */
  const LINES = [
    '<span class="cm">&lt;!-- escrito do zero, sem tema pronto --&gt;</span>',
    '<span class="tg">&lt;section</span> <span class="at">class</span>=<span class="st">"hero"</span><span class="tg">&gt;</span>',
    '  <span class="tg">&lt;h1&gt;</span>Música que <span class="tg">&lt;em&gt;</span>acolhe<span class="tg">&lt;/em&gt;</span>.<span class="tg">&lt;/h1&gt;</span>',
    '  <span class="tg">&lt;video</span> <span class="at">autoplay muted loop</span> <span class="at">src</span>=<span class="st">"hero.mp4"</span><span class="tg">&gt;</span>',
    '  <span class="tg">&lt;a</span> <span class="at">href</span>=<span class="st">"https://wa.me/55…"</span><span class="tg">&gt;</span>Consultar data<span class="tg">&lt;/a&gt;</span>',
    '<span class="tg">&lt;/section&gt;</span>',
    '<span class="cm">// publicado no domínio do cliente</span>'
  ];
  let typed = false;
  function typeCode() {
    const box = $('#code'); if (!box || typed) return; typed = true;
    box.innerHTML = '';
    if (reduce) { LINES.forEach((l, i) => box.insertAdjacentHTML('beforeend', '<div class="ln"><span class="n">' + (i + 1) + '</span><span>' + l + '</span></div>')); return; }
    let i = 0;
    const next = () => {
      if (i >= LINES.length) { const last = box.querySelector('.cursor'); if (last) last.remove(); return; }
      const html = LINES[i];
      const row = document.createElement('div'); row.className = 'ln';
      row.innerHTML = '<span class="n">' + (i + 1) + '</span><span class="body"></span>';
      box.appendChild(row);
      const body = row.querySelector('.body');
      const tokens = html.match(/<[^>]+>|&[a-z]+;|[^<&]/g) || [];
      let j = 0;
      const tk = () => {
        if (j >= tokens.length) { i++; setTimeout(next, 140); return; }
        let chunk = tokens[j++]; while (j < tokens.length && tokens[j].startsWith('<')) chunk += tokens[j++];
        body.innerHTML = body.innerHTML.replace('<span class="cursor"></span>', '') + chunk + '<span class="cursor"></span>';
        setTimeout(tk, chunk.length > 1 ? 10 : 22);
      };
      $$('.cursor', box).forEach(c => c.remove()); tk();
    };
    next();
  }

  /* chat do agente — mensagens entram em sequência */
  let chatPlayed = false;
  function playChat() {
    const chat = $('#chat'); if (!chat || chatPlayed) return; chatPlayed = true;
    const items = $$('.msg, .typing', chat);
    if (reduce) { items.forEach(el => { if (el.classList.contains('typing')) el.remove(); else el.classList.add('in'); }); return; }
    let t = 200;
    items.forEach((el) => {
      if (el.classList.contains('typing')) { setTimeout(() => el.classList.add('in'), t); t += 900; setTimeout(() => el.classList.remove('in'), t); t += 100; }
      else { setTimeout(() => el.classList.add('in'), t); t += el.classList.contains('a') ? 1100 : 1300; }
    });
  }

  /* acordeões das frentes */
  $$('[data-acc]').forEach(acc => {
    $$('.acc-q', acc).forEach(btn => btn.addEventListener('click', () => {
      const item = btn.parentElement, open = item.classList.contains('open');
      $$('.acc-item', acc).forEach(i => { i.classList.remove('open'); i.querySelector('.acc-q').setAttribute('aria-expanded', 'false'); });
      if (!open) { item.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
    }));
  });

  /* demo: proposta online */
  const opts = $$('.opt'), demoTitle = $('#demoTitle'), demoItems = $('#demoItems'), demoTotal = $('#demoTotal'), accept = $('#demoAccept'), toast = $('#demoToast'), resetBtn = $('#demoReset');
  const brl = (n) => 'R$ ' + Number(n).toLocaleString('pt-BR');
  const check = '<svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>';
  function renderDemo(btn) {
    opts.forEach(o => o.classList.toggle('on', o === btn));
    demoTitle.textContent = btn.dataset.title;
    demoItems.innerHTML = btn.dataset.items.split('|').map(i => '<li>' + check + i + '</li>').join('');
    demoTotal.textContent = brl(btn.dataset.price);
  }
  if (opts.length) {
    renderDemo($('.opt.on') || opts[0]);
    opts.forEach(o => o.addEventListener('click', () => { if (accept.classList.contains('done')) return; renderDemo(o); }));
    accept.addEventListener('click', () => {
      if (accept.classList.contains('done')) return;
      accept.classList.add('done'); accept.textContent = 'Proposta aceita ✓';
      toast.classList.add('in'); resetBtn.hidden = false;
      opts.forEach(o => { if (!o.classList.contains('on')) o.style.opacity = '.45'; });
    });
    resetBtn.addEventListener('click', () => {
      accept.classList.remove('done'); accept.textContent = 'Aceitar esta proposta';
      toast.classList.remove('in'); resetBtn.hidden = true;
      opts.forEach(o => { o.style.opacity = ''; });
    });
  }

  /* dúvidas: filtros + abrir/fechar */
  $$('#faqChips button').forEach(b => b.addEventListener('click', () => {
    $$('#faqChips button').forEach(x => x.classList.remove('on')); b.classList.add('on');
    const f = b.dataset.f;
    $$('#faqList .faq-item').forEach(it => it.classList.toggle('hide', f !== 'todos' && it.dataset.f !== f));
  }));
  $$('.faq-q').forEach(q => q.addEventListener('click', () => {
    const it = q.parentElement, open = it.classList.contains('open');
    $$('.faq-item.open').forEach(o => { o.classList.remove('open'); o.querySelector('.faq-q').setAttribute('aria-expanded', 'false'); });
    if (!open) { it.classList.add('open'); q.setAttribute('aria-expanded', 'true'); }
  }));

  /* formulário → WhatsApp (sem backend) */
  const form = $('#leadForm');
  form && form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = $('#fNome').value.trim(), emp = $('#fEmp').value.trim(), nec = $('#fNec').value;
    const msg = 'Olá, RK! Sou ' + (nome || '…') + (emp ? ', da ' + emp : '') + '. Preciso de: ' + nec + '. Quero o diagnóstico gratuito.';
    window.open('https://wa.me/5542999246208?text=' + encodeURIComponent(msg), '_blank', 'noopener');
  });
})();
