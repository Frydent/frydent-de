/* FRYDENT – mobiles Hamburger-Menü */
(function () {
  function getHeader() {
    var b = document.querySelector('.hamburger-btn');
    return b ? b.closest('header') : null;
  }
  function setState(btn, open) {
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    var o = btn.querySelector('.hb-open');
    var c = btn.querySelector('.hb-close');
    if (o && c) {
      o.style.display = open ? 'none' : '';
      c.style.display = open ? '' : 'none';
    }
    var lbl = btn.querySelector('.hb-label');
    if (lbl) lbl.textContent = open ? 'Schließen' : 'Menü';
  }
  function closeMenu() {
    var h = getHeader();
    if (!h || !h.classList.contains('menu-open')) return;
    h.classList.remove('menu-open');
    var btn = h.querySelector('.hamburger-btn');
    if (btn) setState(btn, false);
  }

  window.toggleMenu = function (btn) {
    var h = btn.closest('header');
    if (!h) return;
    var open = h.classList.toggle('menu-open');
    setState(btn, open);
  };

  document.addEventListener('click', function (e) {
    var h = getHeader();
    if (!h || !h.classList.contains('menu-open')) return;
    if (e.target.closest('.hamburger-btn')) return;      // Button: toggleMenu regelt das
    if (!h.contains(e.target)) { closeMenu(); return; }  // außerhalb -> zu
    if (e.target.closest('a[href]')) { closeMenu(); }    // Link angetippt -> zu
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
})();
