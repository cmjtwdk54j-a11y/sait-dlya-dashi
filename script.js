document.addEventListener('DOMContentLoaded', () => {

  // ── Mobile menu ──────────────────────────────────────────
  const burger     = document.querySelector('.header__burger');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuClose  = document.getElementById('menuClose');

  function openMobileMenu() {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (burger)    burger.addEventListener('click', openMobileMenu);
  if (menuClose) menuClose.addEventListener('click', closeMobileMenu);

  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', e => {
        const modalId = link.dataset.modal;
        closeMobileMenu();
        if (modalId) {
          e.preventDefault();
          setTimeout(() => openModal(modalId), 350);
        }
      });
    });
  }

  // ── Modals ───────────────────────────────────────────────
  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.card[data-modal]').forEach(card => {
    card.addEventListener('click', () => openModal(card.dataset.modal));
  });

  document.querySelectorAll('.modal').forEach(modal => {
    const overlay = modal.querySelector('.modal__overlay');
    const closeBtn = modal.querySelector('.modal__close');
    if (overlay) overlay.addEventListener('click', () => closeModal(modal));
    if (closeBtn) closeBtn.addEventListener('click', () => closeModal(modal));
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal.open').forEach(closeModal);
      closeMobileMenu();
    }
  });

  // ── Healing: категории ───────────────────────────────────
  document.querySelectorAll('.heal-cat').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.cat;
      document.querySelectorAll('.heal-cat').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.heal-section').forEach(s => s.classList.remove('active'));
      const target = document.querySelector(`.heal-section[data-cat="${cat}"]`);
      if (target) target.classList.add('active');
    });
  });

  // ── Healing: подкатегории ────────────────────────────────
  document.querySelectorAll('.heal-sub').forEach(btn => {
    btn.addEventListener('click', () => {
      const sub = btn.dataset.sub;
      const section = btn.closest('.heal-section');
      if (!section) return;
      section.querySelectorAll('.heal-sub').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      section.querySelectorAll('.heal-sub-panel').forEach(p => p.classList.remove('active'));
      const panel = section.querySelector(`.heal-sub-panel[data-sub="${sub}"]`);
      if (panel) panel.classList.add('active');
    });
  });

  // ── Header scroll effect ─────────────────────────────────
  const header = document.querySelector('.header');
  if (header) {
    function updateHeader() {
      header.classList.toggle('scrolled', window.scrollY > 80);
    }
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  }

  // ── Card scroll reveal ───────────────────────────────────
  const cards = document.querySelectorAll('.card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => observer.observe(card));

});
