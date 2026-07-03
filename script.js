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
  card.addEventListener('click', () => {
    openModal(card.dataset.modal);
  });
});

document.querySelectorAll('.modal').forEach(modal => {
  modal.querySelector('.modal__overlay').addEventListener('click', () => closeModal(modal));
  modal.querySelector('.modal__close').addEventListener('click', () => closeModal(modal));
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal.open').forEach(closeModal);
  }
});

// Healing: главные категории
document.querySelectorAll('.heal-cat').forEach(btn => {
  btn.addEventListener('click', () => {
    const cat = btn.dataset.cat;
    document.querySelectorAll('.heal-cat').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.heal-section').forEach(s => s.classList.remove('active'));
    document.querySelector(`.heal-section[data-cat="${cat}"]`).classList.add('active');
  });
});

// Healing: подкатегории (работает для любой секции)
document.querySelectorAll('.heal-sub').forEach(btn => {
  btn.addEventListener('click', () => {
    const sub = btn.dataset.sub;
    const section = btn.closest('.heal-section');
    section.querySelectorAll('.heal-sub').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    section.querySelectorAll('.heal-sub-panel').forEach(p => p.classList.remove('active'));
    section.querySelector(`.heal-sub-panel[data-sub="${sub}"]`).classList.add('active');
  });
});

// Card scroll reveal
const cards = document.querySelectorAll('.card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 100);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

cards.forEach(card => observer.observe(card));
