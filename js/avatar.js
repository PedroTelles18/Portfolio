// Avatar real de Pedro, com um leve aceno periódico.
// Chame renderAvatar('id-do-container') em qualquer
// <div class="photo-card" id="..."></div> vazio.

function renderAvatar(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const img = document.createElement('img');
  img.src = 'img/avatar.png';
  img.alt = 'Avatar de Pedro Telles';
  img.className = 'avatar-illustration';
  container.prepend(img);

  function playWave() {
    img.classList.add('wave');
    setTimeout(() => img.classList.remove('wave'), 700);
  }

  setInterval(playWave, 4000);
  img.addEventListener('mouseenter', playWave);
}
