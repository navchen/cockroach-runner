/* ==========================================================================
   GNA Arena — shared behaviour (load in <head>, not deferred)
   1. One theme for the whole site (key "gna-theme"; defaults to the OS setting)
      kept in sync with each module's own toggle.
   2. Ctrl/⌘ + K: search every lesson in every module.  "/" stays module search.
   3. Home: "Continue where you left off" + progress on each module card,
      a theme toggle and search button in the header, and scroll reveal.
   ========================================================================== */
(function () {
  'use strict';
  var html = document.documentElement;
  var THEME_KEY = 'gna-theme';
  var MODULES = {
    'ai':            { key: 'atlas-ai-studio-v1', done: 'completed', name: 'Atlas AI',       label: 'AI' },
    'python':        { key: 'python-atelier-v1',  done: 'done',      name: 'Python Atelier', label: 'Python' },
    'playwright':    { key: 'testcraft-academy-v1', done: 'completed', name: 'Testcraft',    label: 'Playwright' },
    'system-design': { key: 'systems-studio-v2', alt: 'systems-studio-v1', done: 'completed', name: 'Systems Studio', label: 'System design', byIndex: true }
  };
  var ORDER = ['ai', 'python', 'playwright', 'system-design'];

  /* ---------- safe storage ---------- */
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function readJSON(k) { try { var r = lsGet(k); return r ? JSON.parse(r) : null; } catch (e) { return null; } }

  var m = location.pathname.match(/\/learn\/([\w-]+)\//);
  var MOD = m && MODULES[m[1]] ? m[1] : null;
  var IS_HOME = /^\/(index\.html)?$/.test(location.pathname);
  if (MOD) html.setAttribute('data-gna-module', MOD);

  /* ---------- 1. theme ---------- */
  var mq = window.matchMedia ? matchMedia('(prefers-color-scheme: dark)') : null;
  function wanted() { var t = lsGet(THEME_KEY); return t === 'dark' || t === 'light' ? t : (mq && mq.matches ? 'dark' : 'light'); }
  function paint(t) {
    html.classList.toggle('gna-dark', t === 'dark');
    html.style.colorScheme = t;
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', t === 'dark' ? '#121915' : '#315b46');
  }
  var theme = wanted();
  paint(theme);
  if (MOD === 'ai' || MOD === 'system-design') html.setAttribute('data-theme', theme);
  // Pre-seed the module's saved state so it boots in the right theme (no flash).
  if (MOD) {
    var cfg = MODULES[MOD], st = readJSON(cfg.key);
    if (st && st.theme !== theme) { st.theme = theme; lsSet(cfg.key, JSON.stringify(st)); }
  }

  function moduleTheme() {
    if (MOD === 'ai' || MOD === 'system-design') return html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    if (MOD === 'playwright' || MOD === 'python') return document.body && document.body.classList.contains('dark') ? 'dark' : 'light';
    return theme;
  }
  function flipModule() {
    var sel = { 'ai': '#theme-toggle', 'playwright': '#themeToggle', 'system-design': '#theme' }[MOD];
    if (MOD === 'python' && typeof window.toggleTheme === 'function') return window.toggleTheme();
    var b = sel && document.querySelector(sel); if (b) b.click();
  }
  function setTheme(t, fromModule) {
    theme = t; lsSet(THEME_KEY, t); paint(t);
    if (MOD && !fromModule && moduleTheme() !== t) flipModule();
    document.querySelectorAll('.gna-theme-btn').forEach(renderThemeBtn);
  }
  window.gnaSetTheme = setTheme;

  function syncModule() {
    if (!MOD) return;
    if (moduleTheme() !== theme) flipModule();
    // Afterwards, the module's own toggle drives the shared setting.
    var obs = new MutationObserver(function () {
      var t = moduleTheme();
      if (t !== theme) { theme = t; lsSet(THEME_KEY, t); paint(t); }
    });
    obs.observe(html, { attributes: true, attributeFilter: ['data-theme'] });
    obs.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  }
  if (mq && mq.addEventListener) mq.addEventListener('change', function () { if (!lsGet(THEME_KEY)) setTheme(mq.matches ? 'dark' : 'light'); });
  window.addEventListener('storage', function (e) { if (e.key === THEME_KEY && e.newValue && e.newValue !== theme) setTheme(e.newValue); });

  /* ---------- icons ---------- */
  var I = {
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>'
  };
  var isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
  function renderThemeBtn(b) {
    var d = theme === 'dark';
    b.innerHTML = d ? I.sun : I.moon;
    b.setAttribute('aria-label', 'Switch to ' + (d ? 'light' : 'dark') + ' theme');
    b.title = b.getAttribute('aria-label');
  }

  /* ---------- 2. catalog + progress ---------- */
  var catalogP = null;
  function catalog() {
    if (!catalogP) catalogP = fetch('/shared/catalog.json').then(function (r) { return r.json(); }).catch(function () { return { modules: {} }; });
    return catalogP;
  }
  function progress(id, lessons) {
    var cfg = MODULES[id], st = readJSON(cfg.key) || (cfg.alt && readJSON(cfg.alt));
    if (!st) return null;
    var done = Array.isArray(st[cfg.done]) ? st[cfg.done] : [];
    var idx = -1;
    if (cfg.byIndex) idx = typeof st.lastLesson === 'number' ? st.lastLesson : 0;
    else lessons.forEach(function (l, i) { if (l.id === st.lastLesson) idx = i; });
    if (idx < 0 || idx >= lessons.length) idx = 0;
    var isDone = function (l, i) { return done.indexOf(cfg.byIndex ? i : l.id) > -1; };
    var count = lessons.filter(isDone).length;
    // Merely opening a module saves default state; only count real activity.
    if (!count && idx === 0) return null;
    // If the last lesson is finished, point at the next unfinished one.
    if (isDone(lessons[idx], idx)) {
      for (var j = 0; j < lessons.length; j++) { var k = (idx + j) % lessons.length; if (!isDone(lessons[k], k)) { idx = k; break; } }
    }
    return { count: count, total: lessons.length, next: lessons[idx], nextIndex: idx, isDone: isDone };
  }
  function lessonHref(id, l, i) {
    return '/learn/' + id + '/' + (MODULES[id].byIndex ? '#lesson-' + i : '#lesson/' + encodeURIComponent(l.id));
  }

  /* System design has no URL routing — support #lesson-N links. */
  function sdDeepLink() {
    var h = location.hash.match(/^#lesson-(\d+)$/);
    if (MOD === 'system-design' && h && typeof window.openLesson === 'function') {
      try { window.openLesson(Number(h[1])); history.replaceState(null, '', location.pathname); } catch (e) {}
    }
  }

  /* ---------- 2b. command palette ---------- */
  var pal, input, list, items = [], sel = 0;
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function hl(text, q) {
    var t = esc(text); if (!q) return t;
    q.split(/\s+/).filter(Boolean).forEach(function (w) {
      t = t.replace(new RegExp('(' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'), '<mark class="gna-hl">$1</mark>');
    });
    return t;
  }
  function buildPalette() {
    pal = document.createElement('dialog');
    pal.className = 'gna-palette';
    pal.setAttribute('aria-label', 'Search GNA Arena');
    pal.innerHTML =
      '<div class="gna-pal-input">' + I.search +
      '<input type="search" placeholder="Search all lessons across GNA Arena…" aria-label="Search all lessons" role="combobox" aria-expanded="true" aria-controls="gna-pal-list" autocomplete="off" spellcheck="false">' +
      '<kbd>Esc</kbd></div><ul class="gna-pal-list" id="gna-pal-list" role="listbox"></ul>' +
      '<div class="gna-pal-foot"><span><kbd>↑</kbd><kbd>↓</kbd>move</span><span><kbd>↵</kbd>open</span><span><kbd>' + (isMac ? '⌘' : 'Ctrl') + '</kbd><kbd>K</kbd>toggle</span></div>';
    document.body.appendChild(pal);
    input = pal.querySelector('input'); list = pal.querySelector('ul');
    input.addEventListener('input', function () { render(input.value); });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault(); if (!items.length) return;
        sel = (sel + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length; mark();
      } else if (e.key === 'Enter' && items[sel]) { e.preventDefault(); go(items[sel].href); }
    });
    pal.addEventListener('click', function (e) { if (e.target === pal) pal.close(); });
    list.addEventListener('click', function (e) { var a = e.target.closest('a'); if (a) { e.preventDefault(); go(a.getAttribute('href')); } });
  }
  function go(href) {
    pal.close();
    var u = new URL(href, location.href);
    if (u.pathname === location.pathname && u.hash) { location.hash = u.hash; sdDeepLink(); }
    else location.href = href;
  }
  function mark() {
    list.querySelectorAll('.gna-pal-item').forEach(function (li, i) {
      li.setAttribute('aria-selected', i === sel ? 'true' : 'false');
      if (i === sel) li.scrollIntoView({ block: 'nearest' });
    });
  }
  function render(q) {
    catalog().then(function (cat) {
      q = (q || '').trim().toLowerCase();
      var words = q.split(/\s+/).filter(Boolean), groups = [];
      if (!q) {
        var cont = [];
        ORDER.forEach(function (id) {
          var mm = cat.modules[id]; if (!mm) return;
          var p = progress(id, mm.lessons);
          if (p) cont.push({ m: id, title: p.next.title, desc: 'Continue · ' + mm.name, meta: p.count + '/' + p.total, href: lessonHref(id, p.next, p.nextIndex) });
        });
        if (cont.length) groups.push(['Continue learning', cont]);
        groups.push(['Modules', ORDER.map(function (id) {
          var mm = cat.modules[id]; return { m: id, title: MODULES[id].name, desc: (mm ? mm.lessons.length : '') + ' lessons · ' + MODULES[id].label, meta: '', href: '/learn/' + id + '/' };
        }).concat([{ m: 'game', title: 'Cockroach Runner', desc: 'Take a break in the arcade', meta: '', href: '/game.html' },
                   { m: 'home', title: 'GNA Arena home', desc: 'All modules', meta: '', href: '/' }])]);
      } else {
        var hits = [];
        ORDER.forEach(function (id) {
          var mm = cat.modules[id]; if (!mm) return;
          var p = progress(id, mm.lessons);
          mm.lessons.forEach(function (l, i) {
            var t = l.title.toLowerCase(), d = (l.desc || '').toLowerCase() + ' ' + (l.track || '') + ' ' + MODULES[id].label.toLowerCase(), s = 0;
            for (var w = 0; w < words.length; w++) {
              var ti = t.indexOf(words[w]);
              if (ti === 0) s += 6; else if (ti > 0) s += 4; else if (d.indexOf(words[w]) > -1) s += 1; else { s = 0; break; }
            }
            if (s) hits.push({ s: s, m: id, title: l.title, desc: MODULES[id].label + (l.desc ? ' · ' + l.desc : ''),
              meta: p && p.isDone(l, i) ? '<span class="ok">✓ done</span>' : (l.min ? l.min + ' min' : ''), href: lessonHref(id, l, i) });
          });
        });
        hits.sort(function (a, b) { return b.s - a.s; });
        if (hits.length) groups.push(['Lessons', hits.slice(0, 40)]);
      }
      items = []; var out = '';
      groups.forEach(function (g) {
        out += '<li class="gna-pal-group" role="presentation">' + g[0] + '</li>';
        g[1].forEach(function (it) {
          items.push(it);
          out += '<li class="gna-pal-item" role="option" data-m="' + it.m + '"><a href="' + esc(it.href) + '"><span class="dot"></span><span><b>' +
            hl(it.title, q) + '</b><span class="d">' + hl(it.desc, q) + '</span></span><em>' + it.meta + '</em></a></li>';
        });
      });
      list.innerHTML = out || '<li class="gna-pal-empty">No lessons match “' + esc(q) + '”. Try a broader word like “agents”, “locators” or “caching”.</li>';
      sel = 0; mark();
    });
  }
  function openPalette() {
    if (!pal) buildPalette();
    if (pal.open) return pal.close();
    document.querySelectorAll('dialog[open]').forEach(function (d) { if (d !== pal) d.close(); });
    pal.showModal(); input.value = ''; render(''); input.focus();
  }
  window.gnaOpenSearch = openPalette;
  // Capture phase so Ctrl/⌘K is always the global search on every page.
  window.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && !e.shiftKey && e.key && e.key.toLowerCase() === 'k') {
      e.preventDefault(); e.stopImmediatePropagation(); openPalette();
    } else if (MOD === 'ai' && e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test((document.activeElement || {}).tagName || '') &&
               !document.querySelector('dialog[open]') && typeof window.openSearch === 'function') {
      e.preventDefault(); window.openSearch(); // "/" = search this module, like Python & Playwright
    }
  }, true);

  /* ---------- 3. home enhancements ---------- */
  function homeTools(header) {
    if (header.querySelector('.gna-tools')) return;
    var box = document.createElement('div'); box.className = 'gna-tools';
    box.innerHTML = '<button type="button" class="gna-icon-btn gna-search-btn" aria-label="Search all lessons">' + I.search +
      '<span class="gna-label">Search</span><kbd>' + (isMac ? '⌘K' : 'Ctrl K') + '</kbd></button>' +
      '<button type="button" class="gna-icon-btn gna-theme-btn"></button>';
    var inner = header.querySelector('.arena-header-inner') || header;
    var start = inner.querySelector('.nav-start');
    if (start) inner.insertBefore(box, start); else inner.appendChild(box);
    box.querySelector('.gna-search-btn').onclick = openPalette;
    var tb = box.querySelector('.gna-theme-btn'); renderThemeBtn(tb);
    tb.onclick = function () { setTheme(theme === 'dark' ? 'light' : 'dark'); };
  }
  function homeProgress(root) {
    catalog().then(function (cat) {
      var started = [];
      ORDER.forEach(function (id) {
        var mm = cat.modules[id]; if (!mm) return;
        var p = progress(id, mm.lessons); if (!p) return;
        started.push([id, p]);
        // progress strip on the matching module card
        var link = root.querySelector('.module-card a[href="/learn/' + id + '/"]');
        var card = link && link.closest('.module-card');
        if (card && !card.querySelector('.gna-card-progress')) {
          var row = document.createElement('div'); row.className = 'gna-card-progress';
          row.innerHTML = '<div class="gna-bar"><i></i></div><span>' + p.count + ' / ' + p.total + ' done</span>';
          var body = card.querySelector('.module-meta') || card.querySelector('.module-body');
          body.parentNode.insertBefore(row, body.nextSibling);
          requestAnimationFrame(function () { row.querySelector('i').style.width = Math.round(100 * p.count / p.total) + '%'; });
        }
      });
      if (!started.length || root.querySelector('.gna-continue')) return;
      var sec = document.createElement('section'); sec.className = 'gna-continue'; sec.setAttribute('aria-labelledby', 'gna-continue-h');
      sec.innerHTML = '<h2 id="gna-continue-h">Pick up where you left off</h2><p>Your progress is saved in this browser.</p><div class="gna-continue-grid">' +
        started.map(function (s) {
          var id = s[0], p = s[1], pct = Math.round(100 * p.count / p.total);
          return '<a class="gna-cont-card" data-m="' + id + '" href="' + esc(lessonHref(id, p.next, p.nextIndex)) + '"><small>' + MODULES[id].label + '</small><strong>' +
            esc(p.next.title) + '</strong><div class="gna-bar" role="progressbar" aria-label="' + MODULES[id].label + ' progress" aria-valuenow="' + pct +
            '" aria-valuemin="0" aria-valuemax="100"><i data-w="' + pct + '"></i></div><span class="gna-go">' + p.count + ' of ' + p.total + ' lessons · Continue →</span></a>';
        }).join('') + '</div>';
      var anchor = root.querySelector('.arena-stats') || root.querySelector('.arena-hero');
      if (anchor) anchor.parentNode.insertBefore(sec, anchor.nextSibling);
      requestAnimationFrame(function () { sec.querySelectorAll('i[data-w]').forEach(function (i) { i.style.width = i.dataset.w + '%'; }); });
    });
  }
  var io = ('IntersectionObserver' in window) ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('gna-in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px' }) : null;
  function reveal(root) {
    if (!io) return;
    root.querySelectorAll('.module-card, .learning-guide, .arena-personal, .gna-cont-card').forEach(function (el, i) {
      if (el.dataset.gnaRev) return; el.dataset.gnaRev = '1';
      var r = el.getBoundingClientRect(); if (r.top < innerHeight) return; // already on screen: don't hide it
      el.classList.add('gna-reveal'); el.style.transitionDelay = (i % 4) * 60 + 'ms'; io.observe(el);
    });
  }
  function initHome() {
    var root = document.getElementById('root'); if (!root) return;
    var tick = function () {
      var header = root.querySelector('.arena-header');
      if (header) homeTools(header);
      if (root.querySelector('.module-card')) { homeProgress(root); reveal(root); }
    };
    new MutationObserver(tick).observe(root, { childList: true, subtree: true });
    tick();
  }

  document.addEventListener('DOMContentLoaded', function () {
    syncModule();
    sdDeepLink();
    if (IS_HOME) initHome();
    window.addEventListener('hashchange', sdDeepLink);
  });
})();
