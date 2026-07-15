/* FRYDENT – mobiles Hamburger-Menü */
(function () {
  function getHeader() {
    var b = document.querySelector('.hamburger-btn');
    return b ? b.closest('header') : null;
  }
  function setState(btn, open) {
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    var o = btn.querySelector('.hb-open');
    var c = btn.querySelector('.hb-close');
    if (o && c) {
      o.style.display = open ? 'none' : '';
      c.style.display = open ? '' : 'none';
    }
  }
  function closeMenu() {
    var h = getHeader();
    if (!h || !h.classList.contains('menu-open')) return;
    h.classList.remove('menu-open');
    // Untermenüs wieder einklappen
    h.querySelectorAll('.ndrop.expanded').forEach(function (d) { d.classList.remove('expanded'); });
    var btn = h.querySelector('.hamburger-btn');
    if (btn) setState(btn, false);
  }

  window.toggleMenu = function (btn) {
    var h = btn.closest('header');
    if (!h) return;
    var open = h.classList.toggle('menu-open');
    if (!open) h.querySelectorAll('.ndrop.expanded').forEach(function (d) { d.classList.remove('expanded'); });
    setState(btn, open);
  };

  document.addEventListener('click', function (e) {
    var h = getHeader();
    if (!h || !h.classList.contains('menu-open')) return;
    if (e.target.closest('.hamburger-btn')) return;

    // Nur auf Mobil: Pfeil (svg im Dropdown-Elternlink) klappt Untermenü auf/zu,
    // statt zur Seite zu navigieren.
    var isMobile = window.matchMedia('(max-width: 900px)').matches;
    if (isMobile) {
      var drop = e.target.closest('.ndrop');
      var inArrow = e.target.closest('svg');
      if (drop && inArrow) {
        e.preventDefault();
        e.stopPropagation();
        drop.classList.toggle('expanded');
        return;
      }
    }

    if (!h.contains(e.target)) { closeMenu(); return; }   // außerhalb -> zu
    if (e.target.closest('a[href]')) { closeMenu(); }     // echter Link -> zu
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
})();
