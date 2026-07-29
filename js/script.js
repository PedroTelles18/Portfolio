// Anima as camadas do "stack" conforme entram na tela
const layers = document.querySelectorAll('.layer');
if (layers.length) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 90);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  layers.forEach((l) => obs.observe(l));
}

// Marca o link ativo no menu com base na página atual
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach((link) => {
  const href = link.getAttribute('href');
  if (href === currentPage) {
    link.classList.add('active');
  }
});

// Envio do formulário de contato (front-end apenas — plugue seu backend/serviço de email aqui)
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Formulário pronto para conectar a um backend ou serviço como Formspree/EmailJS.');
  });
}
