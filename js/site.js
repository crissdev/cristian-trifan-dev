(function () {
  'use strict';

  const root = document.documentElement;

  // We are running, so the head's blank-page failsafe is no longer needed.
  clearTimeout(window.__revealFailsafe);

  /* --- Theme ------------------------------------------------------------- */

  const toggle = document.getElementById('theme-toggle');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
  const PALETTE = { light: '#f7f7f5', dark: '#0e1117' };
  const metaLight = document.querySelector('meta[name="theme-color"][media*="light"]');
  const metaDark = document.querySelector('meta[name="theme-color"][media*="dark"]');

  function currentTheme() {
    return root.dataset.theme || (systemDark.matches ? 'dark' : 'light');
  }

  // Browsers pick the first theme-color whose media matches, so an appended
  // override would lose. Point both metas at the chosen colour instead, and
  // hand them back to the OS when there is no explicit choice.
  function syncThemeColor() {
    if (!metaLight || !metaDark) return;
    const chosen = root.dataset.theme;
    metaLight.setAttribute('content', chosen ? PALETTE[chosen] : PALETTE.light);
    metaDark.setAttribute('content', chosen ? PALETTE[chosen] : PALETTE.dark);
  }

  function syncLabel() {
    if (!toggle) return;
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    toggle.setAttribute('aria-label', 'Switch to ' + next + ' theme');
  }

  function sync() {
    syncLabel();
    syncThemeColor();
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      const next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) {}
      sync();
    });
  }

  sync();

  // Follow the OS while the visitor has not made an explicit choice.
  const onSystemChange = function () {
    if (!root.dataset.theme) sync();
  };
  if (systemDark.addEventListener) systemDark.addEventListener('change', onSystemChange);
  else if (systemDark.addListener) systemDark.addListener(onSystemChange);

  /* --- Reveal on scroll -------------------------------------------------- */

  const items = document.querySelectorAll('.reveal');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!('IntersectionObserver' in window) || reduced) {
    items.forEach(function (item) { item.classList.add('is-visible'); });
    return;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
  );

  items.forEach(function (item) { observer.observe(item); });
})();
