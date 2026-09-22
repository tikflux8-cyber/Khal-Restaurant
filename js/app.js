/* ═══════════════════════════════════════════════════
   RESTAURANT MAIN APPLICATION
   ═══════════════════════════════════════════════════ */

(function() {
  'use strict';

  const config = restaurantConfig;
  const menu = menuData;

  // removed
  // removed
  // removed
  // removed
  // removed
  // removed
  // removed

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    populateConfig();
    buildMenuBook();
    buildGallery();
    setupNavigation();
    setupLightbox();
    setupWheel();
    setTimeout(hidePreloader, 2800);
    setupScrollEffects();
  }

  function hidePreloader() {
    const p = document.getElementById('preloader');
    if (p) p.classList.add('hidden');
  }

  /* ─── Config Population ────────────────────── */
  function populateConfig() {
    const set = (id, val, attr) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (attr) el[attr] = val;
      else el.textContent = val;
    };
    set('preloader-name', config.name);
    set('nav-restaurant-name', config.name);
    set('hero-title', config.name);
    set('hero-subtitle', config.description);
    set('about-title', config.about.title);
    set('about-text', config.about.text);
    set('about-year', config.about.year);
    set('contact-phone', config.phone, 'textContent');
    set('contact-phone', 'tel:' + config.phone, 'href');
    set('contact-address', config.address);
    set('contact-call', 'tel:' + config.phone, 'href');
    set('contact-whatsapp', 'https://wa.me/' + config.whatsapp, 'href');
    set('contact-whatsapp2', 'https://wa.me/' + config.whatsapp2, 'href');
    set('contact-map', config.googleMaps, 'href');
    set('footer-desc', config.description);
    set('footer-phone', '\u{1F4DE} ' + config.phone);
    set('footer-address', '\u{1F4CD} ' + config.address);
    set('footer-year', new Date().getFullYear());
    set('footer-name-bottom', config.name);
    set('footer-name', config.name);

    buildSocialLinks('social-links');
    buildSocialLinks('footer-social');
  }

  function buildSocialLinks(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    c.innerHTML = '';
    const map = {
      tiktok: ['\u{1F3B5}', 'TikTok'],
      instagram: ['\u{1F4F7}', 'Instagram'],
      facebook: ['\u{1F4D8}', 'Facebook'],
      telegram: ['\u2708\uFE0F', 'Telegram'],
      whatsapp: ['\u{1F4AC}', 'WhatsApp'],
      youtube: ['\u25B6\uFE0F', 'YouTube']
    };
    for (const [key, url] of Object.entries(config.socialLinks)) {
      const [icon, label] = map[key] || ['\u{1F517}', key];
      const a = document.createElement('a');
      a.className = 'social-link';
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.title = label;
      a.textContent = icon;
      a.setAttribute('aria-label', label);
      c.appendChild(a);
    }
  }

  /* ═══════════════════════════════════════════════
     3D MENU BOOK
     ═══════════════════════════════════════════════ */
          function buildMenuBook() {
    var bookEl = document.getElementById('menu-book');
    bookEl.innerHTML = '';

    var pagesData = [];
    pagesData.push({ type: 'cover' });

    var menuCats = menu.categories.filter(function(c) { return c.type === 'menu'; });
    for (var ci = 0; ci < menuCats.length; ci++) {
      var cat = menuCats[ci];
      var items = menu.items.filter(function(i) { return i.category === cat.id; });
      for (var ii = 0; ii < items.length; ii++) {
        pagesData.push({ type: 'photo', item: items[ii] });
      }
    }
    pagesData.push({ type: 'special' });
    pagesData.push({ type: 'thankyou' });

    var totalPages = pagesData.length;
    var currentPage = 0;

    for (var idx = 0; idx < pagesData.length; idx++) {
      var wrapper = document.createElement('div');
      wrapper.className = 'book-page';
      wrapper.dataset.index = idx;

      var inner = document.createElement('div');
      inner.className = 'book-page-inner';

      var pd = pagesData[idx];
      switch (pd.type) {
        case 'cover':
          inner.innerHTML = '<div class="bp-cover-photo"><img src="images/hero-banner.jpeg" alt="' + config.name + '"></div>';
          break;
        case 'photo':
          inner.innerHTML = '<div class="bp-photo-full"><img src="' + pd.item.image + '" alt="' + pd.item.name + '" onerror="this.parentElement.innerHTML=\'<div class=bp-photo-fallback>' + pd.item.emoji + '</div>\'"></div>';
          break;
        case 'special':
          inner.innerHTML = '<div class="bp-special"><div class="bp-special-ornament">&#x2B50;</div><div class="bp-special-title">الأطباق الخاصة</div><div class="bp-special-text">نقدم لكم أطباقنا الخاصة والمميزة، محضرة بعناية فائقة من أجود المكونات الطازجة.<br><br>اسأل نادلك عن العروض الخاصة والوجبات اليومية.</div></div>';
          break;
        case 'thankyou':
          inner.innerHTML = '<div class="bp-thankyou"><div class="bp-thankyou-heart">&#x2764;&#xFE0F;</div><div class="bp-thankyou-title">شكراً لزيارتكم</div><div class="bp-thankyou-text">نتطلع لزيارتكم مرة أخرى<br><span style="font-size:0.9rem;color:#999;">' + config.phone + '</span></div></div>';
          break;
      }

      wrapper.appendChild(inner);
      bookEl.appendChild(wrapper);
    }

    function renderBook() {
      var pages = bookEl.querySelectorAll('.book-page');
      pages.forEach(function(page, i) {
        page.classList.remove('bp-active', 'bp-flipped', 'bp-behind');
        if (i < currentPage) {
          page.classList.add('bp-flipped');
          page.style.transform = 'rotateY(-180deg)';
          page.style.zIndex = i;
          page.style.visibility = 'hidden';
        } else if (i === currentPage) {
          page.classList.add('bp-active');
          page.style.transform = 'rotateY(0deg)';
          page.style.zIndex = 1000 + (totalPages - i);
          page.style.visibility = 'visible';
        } else {
          page.classList.add('bp-behind');
          var depth = i - currentPage;
          page.style.transform = 'rotateY(0deg) translateZ(' + (-depth) + 'px)';
          page.style.zIndex = 1000 - depth;
          page.style.visibility = 'visible';
        }
      });
      var indicator = document.getElementById('page-indicator');
      if (indicator) indicator.textContent = (currentPage + 1) + ' / ' + totalPages;
      var nextBtn = document.getElementById('book-next');
      var prevBtn = document.getElementById('book-prev');
      if (nextBtn) nextBtn.disabled = currentPage >= totalPages - 1;
      if (prevBtn) prevBtn.disabled = currentPage <= 0;
    }

    renderBook();

    document.getElementById('book-next').addEventListener('click', function() {
      if (currentPage < totalPages - 1) { currentPage++; renderBook(); }
    });
    document.getElementById('book-prev').addEventListener('click', function() {
      if (currentPage > 0) { currentPage--; renderBook(); }
    });

    document.addEventListener('keydown', function(e) {
      var sec = document.getElementById('menu-section');
      if (!sec) return;
      var r = sec.getBoundingClientRect();
      if (r.top > window.innerHeight || r.bottom < 0) return;
      if (e.key === 'ArrowLeft' && currentPage < totalPages - 1) { currentPage++; renderBook(); }
      else if (e.key === 'ArrowRight' && currentPage > 0) { currentPage--; renderBook(); }
    });
  }
function buildGallery() {
    var grid = document.getElementById('gallery-grid');
    if (!grid) return;
    var images = [
      'images/food/gallery-1.webp',
      'images/food/gallery-2.webp',
      'images/food/gallery-3.webp',
      'images/food/gallery-4.webp',
      'images/food/gallery-5.webp',
      'images/food/gallery-6.webp',
      'images/food/gallery-7.webp',
      'images/food/gallery-8.webp',
      'images/food/gallery-9.webp',
      'images/food/gallery-10.png',
      'images/food/gallery-11.png',
      'images/food/gallery-12.png',
      'images/food/gallery-13.png'
    ];
    grid.innerHTML = '';
    images.forEach(function(src, i) {
      var div = document.createElement('div');
      div.className = 'gallery-item';
      var imgEl = document.createElement('img');
      imgEl.src = src;
      imgEl.alt = 'Gallery ' + (i + 1);
      imgEl.loading = 'lazy';
      div.appendChild(imgEl);
      grid.appendChild(div);
    });
  }

  /* ═══════════════════════════════════════════════
     LIGHTBOX
LIGHTBOX
LIGHTBOX
LIGHTBOX
     ═══════════════════════════════════════════════ */
  function setupLightbox() {
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    const lbClose = document.getElementById('lightbox-close');

    document.addEventListener('click', e => {
      const img = e.target.closest('.gallery-item img');
      if (img) {
        lbImg.src = img.src;
        lbImg.alt = img.alt;
        lb.classList.add('active');
      }
    });
    lbClose.addEventListener('click', () => lb.classList.remove('active'));
    lb.addEventListener('click', e => { if (e.target === lb) lb.classList.remove('active'); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') lb.classList.remove('active'); });
  }

  /* ═══════════════════════════════════════════════
     NAVIGATION
     ═══════════════════════════════════════════════ */
  function setupNavigation() {
    const navbar = document.getElementById('navbar');
    const toggle = document.getElementById('nav-toggle');
    const mobile = document.getElementById('mobile-menu');
    const fixedLogo = document.getElementById('fixed-logo');

    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
      fixedLogo.classList.toggle('visible', window.scrollY > 400);
    });

    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      mobile.classList.toggle('active');
      document.body.style.overflow = mobile.classList.contains('active') ? 'hidden' : '';
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        mobile.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    const secs = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
      const y = window.scrollY + 200;
      secs.forEach(s => {
        const top = s.offsetTop;
        const h = s.offsetHeight;
        const id = s.getAttribute('id');
        const link = document.querySelector('.nav-link[href="#' + id + '"]');
        if (link) link.classList.toggle('active', y >= top && y < top + h);
      });
    });
  }

  /* ─── Emoji Effect ──────────────────────────── */
  function showEmoji(x, y, emoji) {
    const c = document.getElementById('emoji-container');
    const el = document.createElement('div');
    el.className = 'emoji-float';
    el.textContent = emoji;
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    c.appendChild(el);
    setTimeout(() => el.remove(), 1200);
  }

  /* ─── Scroll Effects ────────────────────────── */
  function setupScrollEffects() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section-header, .contact-card, .gallery-item, .about-container').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      obs.observe(el);
    });
  }

  /* ═══════════════════════════════════════════════
     LUCKY WHEEL
     ═══════════════════════════════════════════════ */
  function setupWheel() {
    var canvas = document.getElementById('wheel-canvas');
    var spinBtn = document.getElementById('wheel-spin-btn');
    var infoEl = document.getElementById('wheel-info');
    if (!canvas || !spinBtn) return;

    var ctx = canvas.getContext('2d');
    var cx = canvas.width / 2;
    var cy = canvas.height / 2;
    var radius = 170;

    var segments = [
      { text: 'حظ أوفر', color: '#2c1810', prize: 'nothing' },
      { text: 'خصم 50%', color: '#c9a84c', prize: 'discount' },
      { text: 'حظ أوفر', color: '#1a1a2e', prize: 'nothing' },
      { text: 'وجبة مجانية', color: '#d4a574', prize: 'freemeal' },
      { text: 'حظ أوفر', color: '#2c1810', prize: 'nothing' },
      { text: 'حظ أوفر', color: '#1a1a2e', prize: 'nothing' }
    ];

    var segAngle = (2 * Math.PI) / segments.length;
    var currentRotation = 0;
    var isSpinning = false;

    function drawWheel(rotation) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Outer ring decoration
      for (var d = 0; d < 24; d++) {
        var dotAngle = (d / 24) * Math.PI * 2;
        var dotX = cx + Math.cos(dotAngle) * (radius + 8);
        var dotY = cy + Math.sin(dotAngle) * (radius + 8);
        ctx.beginPath();
        ctx.arc(dotX, dotY, 4, 0, Math.PI * 2);
        ctx.fillStyle = d % 2 === 0 ? '#c9a84c' : '#f5e6c8';
        ctx.fill();
      }

      for (var i = 0; i < segments.length; i++) {
        var startA = rotation + i * segAngle;
        var endA = startA + segAngle;

        // Segment gradient
        var grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, lightenColor(segments[i].color, 30));
        grad.addColorStop(1, segments[i].color);

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, radius, startA, endA);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();

        // Segment border
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(startA) * radius, cy + Math.sin(startA) * radius);
        ctx.strokeStyle = 'rgba(245,230,200,0.3)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Text
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(startA + segAngle / 2);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#f5e6c8';
        ctx.font = 'bold 15px Tajawal, sans-serif';
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 4;
        ctx.fillText(segments[i].text, radius * 0.58, 5);
        ctx.shadowBlur = 0;
        ctx.restore();
      }

      // Center circle
      var centerGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 28);
      centerGrad.addColorStop(0, '#f5e6c8');
      centerGrad.addColorStop(0.5, '#c9a84c');
      centerGrad.addColorStop(1, '#8b6914');
      ctx.beginPath();
      ctx.arc(cx, cy, 28, 0, Math.PI * 2);
      ctx.fillStyle = centerGrad;
      ctx.fill();
      ctx.strokeStyle = '#f5e6c8';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Center text
      ctx.fillStyle = '#1a1a1a';
      ctx.font = 'bold 12px Tajawal, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('خال', cx, cy);
    }

    function lightenColor(hex, percent) {
      var num = parseInt(hex.replace('#', ''), 16);
      var amt = Math.round(2.55 * percent);
      var R = Math.min(255, (num >> 16) + amt);
      var G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
      var B = Math.min(255, (num & 0x0000FF) + amt);
      return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
    }

    drawWheel(0);

    var STORAGE_KEY_attempts = 'wheel_attempts';
    var STORAGE_KEY_lastSpin = 'wheel_lastSpin';
    var MAX_ATTEMPTS = 1;

    function getAttempts() {
      return parseInt(localStorage.getItem(STORAGE_KEY_attempts) || '0', 10);
    }

    function canSpin() {
      var lastSpin = localStorage.getItem(STORAGE_KEY_lastSpin);
      if (!lastSpin) return true;
      var elapsed = Date.now() - parseInt(lastSpin, 10);
      return elapsed >= 24 * 60 * 60 * 1000;
    }

    function getTimeLeft() {
      var lastSpin = localStorage.getItem(STORAGE_KEY_lastSpin);
      if (!lastSpin) return null;
      var elapsed = Date.now() - parseInt(lastSpin, 10);
      var remaining = 24 * 60 * 60 * 1000 - elapsed;
      if (remaining <= 0) return null;
      var h = Math.floor(remaining / 3600000);
      var m = Math.floor((remaining % 3600000) / 60000);
      var s = Math.floor((remaining % 60000) / 1000);
      return h + 'h ' + m + 'm ' + s + 's';
    }

    function updateInfo() {
      if (!infoEl) return;
      if (!canSpin()) {
        var tl = getTimeLeft();
        infoEl.textContent = '⏰ المحاولة التالية بعد: ' + tl;
      } else {
        var attempts = getAttempts();
        if (attempts >= MAX_ATTEMPTS) {
          infoEl.textContent = '🎉 مبروك! فزت بجميع محاولاتك';
        } else {
          infoEl.textContent = 'المحاولة ' + (attempts + 1) + ' من ' + MAX_ATTEMPTS;
        }
      }
    }

    function forceWin() {
      var prizes = ['discount', 'freemeal'];
      return prizes[Math.floor(Math.random() * prizes.length)];
    }

    function getWinningSegment() {
      var attempts = getAttempts();
      if (attempts >= 1) {
        return forceWin();
      }
      return 'nothing';
    }

    function showResult(prize) {
      var overlay = document.createElement('div');
      overlay.className = 'wheel-result active';
      var emoji, title, text;
      if (prize === 'discount') {
        emoji = '🎉';
        title = 'مبروك! فزت بخصم 50%';
        text = 'استخدم الكود: KHAL50 عند الطلب';
      } else if (prize === 'freemeal') {
        emoji = '🍽️';
        title = 'مبروك! وجبة مجانية';
        text = 'استلم وجبتك المجانية عند زيارتك القادمة للمطعم';
      } else {
        emoji = '😊';
        title = 'حظ أوفر!';
        text = 'جرب حظك مرة ثانية بعد 24 ساعة';
      }
      overlay.innerHTML = '<div class="wheel-result-box">' +
        '<div class="wheel-result-emoji">' + emoji + '</div>' +
        '<div class="wheel-result-title">' + title + '</div>' +
        '<div class="wheel-result-text">' + text + '</div>' +
        '<button class="wheel-result-close" id="wheel-result-close">حسناً</button>' +
        '</div>';
      document.body.appendChild(overlay);
      overlay.querySelector('#wheel-result-close').addEventListener('click', function() {
        overlay.remove();
        updateInfo();
      });
    }

    spinBtn.addEventListener('click', function() {
      if (isSpinning) return;
      if (!canSpin()) {
        updateInfo();
        return;
      }
      isSpinning = true;
      spinBtn.disabled = true;

      var prize = getWinningSegment();
      var targetIndex = segments.findIndex(function(s) { return s.prize === prize; });
      if (targetIndex === -1) targetIndex = 0;

      var extraSpins = 5 + Math.floor(Math.random() * 3);
      var targetAngle = (2 * Math.PI) - (targetIndex * segAngle + segAngle / 2);
      var totalRotation = extraSpins * 2 * Math.PI + targetAngle;
      var startRotation = currentRotation;
      var startTime = null;
      var duration = 4000 + Math.random() * 1000;

      function animate(ts) {
        if (!startTime) startTime = ts;
        var progress = Math.min((ts - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 4);
        currentRotation = startRotation + totalRotation * eased;
        drawWheel(currentRotation);
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          currentRotation = currentRotation % (2 * Math.PI);
          isSpinning = false;

          var attempts = getAttempts();
          localStorage.setItem(STORAGE_KEY_attempts, attempts + 1);
          localStorage.setItem(STORAGE_KEY_lastSpin, Date.now().toString());

          if (prize !== 'nothing') {
            showResult(prize);
          } else {
            spinBtn.disabled = false;
            updateInfo();
          }
        }
      }

      requestAnimationFrame(animate);
    });

    updateInfo();
    setInterval(updateInfo, 1000);
  }

})();
