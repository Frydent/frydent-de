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
  function finishClose(h) {
    h.classList.remove('menu-open', 'menu-closing');
    var actions = h.querySelector('nav > div:last-child');
    if (actions && actions.dataset.movedToNav === '1') { h.appendChild(actions); delete actions.dataset.movedToNav; }
    h.querySelectorAll('.ndrop.expanded').forEach(function (d) { d.classList.remove('expanded'); });
    var btn = h.querySelector('.hamburger-btn');
    if (btn) setState(btn, false);
  }

  function closeMenu() {
    var h = getHeader();
    if (!h || !h.classList.contains('menu-open') || h.classList.contains('menu-closing')) return;
    h.classList.add('menu-closing');
    var btn = h.querySelector('.hamburger-btn');
    if (btn) setState(btn, false);
    window.setTimeout(function () { finishClose(h); }, 200);
  }

  function moveActionsIntoNav(h, open) {
    var nav = h.querySelector('nav');
    if (!nav) return;
    if (open) {
      var actions = h.querySelector(':scope > div:last-child');
      if (actions && actions.parentElement === h) {
        actions.dataset.movedToNav = '1';
        nav.appendChild(actions);
      }
    } else {
      var moved = nav.querySelector(':scope > div[data-moved-to-nav]');
      if (moved) { h.appendChild(moved); moved.removeAttribute('data-moved-to-nav'); }
    }
  }

  window.toggleMenu = function (btn) {
    var h = btn.closest('header');
    if (!h) return;
    if (h.classList.contains('menu-open') && !h.classList.contains('menu-closing')) {
      closeMenu();
      return;
    }
    if (h.classList.contains('menu-closing')) return;
    h.classList.add('menu-open');
    moveActionsIntoNav(h, true);
    setState(btn, true);
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
