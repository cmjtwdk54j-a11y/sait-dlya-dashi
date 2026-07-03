const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// ── Scroll progress bar
const progressBar = document.getElementById('scrollProgress');
if (progressBar) {
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.transform = `scaleX(${window.scrollY / max})`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
}


// ── Mobile menu
const burger     = document.querySelector('.header__burger');
const mobileMenu = document.getElementById('mobileMenu');
const menuClose  = document.getElementById('menuClose');

burger.addEventListener('click', () => {
  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
});
menuClose.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
});
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── Modals
function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(modal) {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.card[data-modal]').forEach(card => {
  card.addEventListener('click', () => openModal(card.dataset.modal));
});
document.querySelectorAll('.modal').forEach(modal => {
  modal.querySelector('.modal__overlay').addEventListener('click', () => closeModal(modal));
  modal.querySelector('.modal__close').addEventListener('click', () => closeModal(modal));
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') document.querySelectorAll('.modal.open').forEach(closeModal);
});

// ── Healing accordion
document.querySelectorAll('.heal-card__header').forEach(header => {
  header.addEventListener('click', () => {
    const card = header.closest('.heal-card');
    const wasOpen = card.classList.contains('open');
    card.classList.toggle('open');
    header.setAttribute('aria-expanded', String(!wasOpen));
  });
});

// ── 3D card tilt (desktop only, skips modal-linked cards in modal context)
if (isDesktop && !prefersReducedMotion) {
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 14;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -14;
      card.style.transform = `perspective(700px) rotateX(${y}deg) rotateY(${x}deg) translateY(-5px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(700px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
}

// ── Magnetic buttons (desktop only)
if (isDesktop && !prefersReducedMotion) {
  document.querySelectorAll('.hero__btn, .header__cta, .contact__claim').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.transition = 'transform 0.1s ease, background 0.3s, box-shadow 0.3s';
    });
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width  / 2) * 0.28;
      const y = (e.clientY - rect.top  - rect.height / 2) * 0.38;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transition = 'transform 0.55s cubic-bezier(0.16,1,0.3,1), background 0.3s, box-shadow 0.3s';
      btn.style.transform  = 'translate(0, 0)';
    });
  });
}

// ── Scroll reveal observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .reveal, .philosophy__item, .gallery__item').forEach(el => {
  observer.observe(el);
});
