(function () {
  if (customElements.get('ba-slider')) return;

  class BaSlider extends HTMLElement {
    connectedCallback() {
      if (this._built) return;
      this._built = true;

      const before = this.getAttribute('before') || '';
      const after = this.getAttribute('after') || '';
      const beforeLabel = this.getAttribute('before-label') || 'Gestern';
      const afterLabel = this.getAttribute('after-label') || 'Heute';
      const beforeSub = this.getAttribute('before-sub') || '';
      const afterSub = this.getAttribute('after-sub') || '';
      const start = Math.min(100, Math.max(0, parseFloat(this.getAttribute('start') || '62')));

      if (!before || !after) return; // registration mount / no images → render nothing

      this.style.display = 'block';
      this.style.position = 'relative';
      this.style.width = '100%';
      this.style.height = '100%';
      this.style.userSelect = 'none';
      this.style.webkitUserSelect = 'none';
      this.style.touchAction = 'pan-y';
      this.style.cursor = 'ew-resize';
      this.style.overflow = 'hidden';

      const labelStyle =
        'position:absolute;bottom:14px;display:flex;flex-direction:column;align-items:center;' +
        'line-height:1;padding:0;pointer-events:none;z-index:4;transition:opacity .25s ease';
      const wordStyle =
        "font-family:'Quicksand',sans-serif;font-size:17px;font-weight:600;color:#FBF6EC;letter-spacing:1.5px;" +
        'text-shadow:0 1px 3px rgba(30,45,77,.55),0 2px 12px rgba(30,45,77,.45)';
      const subStyle =
        "font-family:'Quicksand',sans-serif;font-size:10px;font-weight:600;letter-spacing:2px;" +
        'color:#FBF6EC;margin-top:4px;text-shadow:0 1px 4px rgba(30,45,77,.7)';
      const lbl = (word, sub) =>
        '<span style="' + wordStyle + '">' + word + '</span>' +
        (sub ? '<span style="' + subStyle + '">' + sub + '</span>' : '');

      this.innerHTML =
        // after (base, new)
        '<img src="' + after + '" alt="' + afterLabel + '" draggable="false" ' +
        'style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block">' +
        // before (overlay, old) clipped from left
        '<div class="ba-before" style="position:absolute;inset:0;overflow:hidden;will-change:clip-path">' +
        '<img src="' + before + '" alt="' + beforeLabel + '" draggable="false" ' +
        'style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block"></div>' +
        // labels
        '<span class="ba-lbl-before" style="' + labelStyle + ';left:16px">' + lbl(beforeLabel, beforeSub) + '</span>' +
        '<span class="ba-lbl-after" style="' + labelStyle + ';right:16px">' + lbl(afterLabel, afterSub) + '</span>' +
        // handle
        '<div class="ba-handle" style="position:absolute;top:0;bottom:0;width:0;z-index:5;transform:translateX(-50%)">' +
        '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:38px;height:38px;' +
        'border-radius:50%;background:#FBF6EC;box-shadow:0 4px 14px rgba(30,45,77,.24),inset 0 0 0 1px rgba(143,116,64,.3);display:flex;align-items:center;' +
        'justify-content:center;gap:3px;animation:ba-handle-pulse 2.2s ease-out infinite">' +
        '<svg width="9" height="14" viewBox="0 0 9 14" fill="none" stroke="#8F7440" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 1 7l5 5"/></svg>' +
        '<svg width="9" height="14" viewBox="0 0 9 14" fill="none" stroke="#8F7440" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2l5 5-5 5"/></svg>' +
        '</div></div>';

      if (!document.getElementById('ba-hint-kf')) {
        const st = document.createElement('style');
        st.id = 'ba-hint-kf';
        st.textContent = '@keyframes ba-handle-pulse{0%,100%{box-shadow:0 4px 14px rgba(30,45,77,.24),inset 0 0 0 1px rgba(143,116,64,.3),0 0 0 0 rgba(251,246,236,.9)}50%{box-shadow:0 4px 14px rgba(30,45,77,.24),inset 0 0 0 1px rgba(143,116,64,.3),0 0 0 16px rgba(251,246,236,0)}}';
        document.head.appendChild(st);
      }

      this._beforeEl = this.querySelector('.ba-before');
      this._handleEl = this.querySelector('.ba-handle');
      this._lblBefore = this.querySelector('.ba-lbl-before');
      this._lblAfter = this.querySelector('.ba-lbl-after');
      this._knobEl = this._handleEl.firstElementChild;

      this._set(start);

      const onMove = (clientX) => {
        const r = this.getBoundingClientRect();
        const pct = ((clientX - r.left) / r.width) * 100;
        this._set(pct);
      };
      const down = (e) => {
        this._drag = true;
        if (this._knobEl) { this._knobEl.style.animation = 'none'; }
        onMove(e.touches ? e.touches[0].clientX : e.clientX);
        e.preventDefault();
      };
      const move = (e) => {
        if (!this._drag) return;
        onMove(e.touches ? e.touches[0].clientX : e.clientX);
      };
      const up = () => { this._drag = false; };

      this.addEventListener('mousedown', down);
      this.addEventListener('touchstart', down, { passive: false });
      window.addEventListener('mousemove', move);
      window.addEventListener('touchmove', move, { passive: true });
      window.addEventListener('mouseup', up);
      window.addEventListener('touchend', up);
    }

    _set(pct) {
      pct = Math.min(100, Math.max(0, pct));
      this._pos = pct;
      // before layer shows the LEFT portion (0..pct)
      this._beforeEl.style.clipPath = 'inset(0 ' + (100 - pct) + '% 0 0)';
      // keep the knob fully visible inside the frame even at 0/100
      this._handleEl.style.left = 'clamp(28px, ' + pct + '%, calc(100% - 28px))';
      // fade labels near the divider
      this._lblBefore.style.opacity = pct < 16 ? '0' : '1';
      this._lblAfter.style.opacity = pct > 84 ? '0' : '1';
    }
  }

  customElements.define('ba-slider', BaSlider);
})();
