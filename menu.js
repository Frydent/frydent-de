/* FRYDENT – mobiles Hamburger-Menü */
(function () {
  function header() {
    var b = document.querySelector('.hamburger-btn');
    return b ? b.closest('header') : null;
  }
  window.toggleMenu = function (btn) {
    var h = btn.closest('header');
    if (!h) return;
    var open = h.classList.toggle('menu-open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    var oIcon = btn.querySelector('.hb-open');
    var cIcon = btn.querySelector('.hb-close');
    if (oIcon && cIcon) {
      oIcon.style.display = open ? 'none' : '';
      cIcon.style.display = open ? '' : 'none';
    }
  };
  // Klick außerhalb schließt das Menü
  document.addEventListener('click', function (e) {
    var h = header();
    if (!h || !h.classList.contains('menu-open')) return;
    if (h.contains(e.target)) return;
    h.classList.remove('menu-open');
    var btn = h.querySelector('.hamburger-btn');
    if (btn) {
      btn.setAttribute('aria-expanded', 'false');
      var o = btn.querySelector('.hb-open'), c = btn.querySelector('.hb-close');
      if (o && c) { o.style.display = ''; c.style.display = 'none'; }
    }
  });
  // Menü schließen, wenn ein Link angetippt wird (außer Dropdown-Eltern)
  document.addEventListener('click', function (e) {
    var a = e.target.closest('header .menu-open a, header.menu-open a');
    // handled via header check below
  });
})();
