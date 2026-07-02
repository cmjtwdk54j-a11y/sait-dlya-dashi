// Mobile menu
const burger = document.querySelector('.header__burger');
const mobileMenu = document.getElementById('mobileMenu');
const menuClose = document.getElementById('menuClose');

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

// Modals
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

// Healing accordion
document.querySelectorAll('.heal-card__header').forEach(header => {
  header.addEventListener('click', () => {
    const card = header.closest('.heal-card');
    const wasOpen = card.classList.contains('open');
    card.classList.toggle('open');
    header.setAttribute('aria-expanded', String(!wasOpen));
  });
});

// Scroll reveal
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
