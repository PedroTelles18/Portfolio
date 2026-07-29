// Avatar 3D estilizado (low-poly) do Pedro, feito em Three.js.
// Chame initAvatar('id-do-container') em qualquer página que tenha
// um <div class="photo-card" id="..."></div> vazio para receber o boneco.

function initAvatar(containerId) {
  const container = document.getElementById(containerId);
  if (!container || typeof THREE === 'undefined') return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- cena, câmera, renderer ----------
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0.15, 5.2);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.cursor = 'grab';

  function resize() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);

  // ---------- luzes ----------
  scene.add(new THREE.AmbientLight(0xffffff, 0.55));

  const keyLight = new THREE.DirectionalLight(0xffffff, 0.9);
  keyLight.position.set(2.5, 3, 3);
  scene.add(keyLight);

  const rimLight = new THREE.PointLight(0x2b5cff, 1.1, 12);
  rimLight.position.set(-2.5, 1, -2);
  scene.add(rimLight);

  const fillLight = new THREE.PointLight(0xffffff, 0.3, 12);
  fillLight.position.set(0, -1.5, 2);
  scene.add(fillLight);

  // ---------- materiais ----------
  const skin = new THREE.MeshStandardMaterial({ color: 0xC98F63, flatShading: true, roughness: 0.7 });
  const hairMat = new THREE.MeshStandardMaterial({ color: 0x241a12, flatShading: true, roughness: 0.6 });
  const shirtMat = new THREE.MeshStandardMaterial({ color: 0x14161c, flatShading: true, roughness: 0.8 });
  const eyeWhite = new THREE.MeshStandardMaterial({ color: 0xf5f1e8, flatShading: true });
  const eyePupil = new THREE.MeshStandardMaterial({ color: 0x1a120b, flatShading: true });
  const mouthMat = new THREE.MeshStandardMaterial({ color: 0xffffff, flatShading: true });

  const avatar = new THREE.Group();

  // ---------- tronco (camiseta preta) ----------
  const torso = new THREE.Mesh(new THREE.BoxGeometry(1.7, 1.15, 0.95), shirtMat);
  torso.position.set(0, -1.15, 0);
  avatar.add(torso);

  const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.12, 8), shirtMat);
  collar.position.set(0, -0.58, 0);
  avatar.add(collar);

  // ---------- pescoço ----------
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.3, 0.32, 8), skin);
  neck.position.set(0, -0.42, 0);
  avatar.add(neck);

  // ---------- cabeça ----------
  const head = new THREE.Mesh(new THREE.IcosahedronGeometry(0.62, 1), skin);
  head.position.set(0, 0.16, 0);
  head.scale.set(0.94, 1.05, 0.92);
  avatar.add(head);

  // orelhas
  const earGeo = new THREE.SphereGeometry(0.12, 8, 8);
  const earL = new THREE.Mesh(earGeo, skin);
  earL.position.set(-0.62, 0.08, 0);
  earL.scale.set(0.7, 1, 0.6);
  avatar.add(earL);
  const earR = earL.clone();
  earR.position.x = 0.62;
  avatar.add(earR);

  // cabelo (base + franja espetada)
  const hairBase = new THREE.Mesh(
    new THREE.SphereGeometry(0.68, 8, 6, 0, Math.PI * 2, 0, Math.PI * 0.62),
    hairMat
  );
  hairBase.position.set(0, 0.42, -0.02);
  avatar.add(hairBase);

  const spikePositions = [
    [-0.28, 0.78, 0.22], [-0.1, 0.84, 0.28], [0.12, 0.84, 0.26],
    [0.3, 0.78, 0.18], [0.0, 0.8, 0.35], [-0.42, 0.68, 0.05], [0.42, 0.68, 0.02]
  ];
  spikePositions.forEach(([x, y, z], i) => {
    const spike = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.34, 5), hairMat);
    spike.position.set(x, y, z);
    spike.rotation.z = (i % 2 === 0 ? 1 : -1) * 0.35;
    spike.rotation.x = -0.5;
    avatar.add(spike);
  });

  // sobrancelhas
  const browGeo = new THREE.BoxGeometry(0.24, 0.055, 0.06);
  const browL = new THREE.Mesh(browGeo, hairMat);
  browL.position.set(-0.22, 0.28, 0.53);
  browL.rotation.z = 0.06;
  avatar.add(browL);
  const browR = browL.clone();
  browR.position.x = 0.22;
  browR.rotation.z = -0.06;
  avatar.add(browR);

  // olhos
  function makeEye(x) {
    const group = new THREE.Group();
    const white = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), eyeWhite);
    group.add(white);
    const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8), eyePupil);
    pupil.position.set(0, 0, 0.07);
    group.add(pupil);
    group.position.set(x, 0.18, 0.53);
    return group;
  }
  avatar.add(makeEye(-0.22));
  avatar.add(makeEye(0.22));

  // nariz
  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.2, 6), skin);
  nose.rotation.x = Math.PI / 2.1;
  nose.position.set(0, 0.02, 0.58);
  avatar.add(nose);

  // bigode
  const mustache = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.09, 0.08), hairMat);
  mustache.position.set(0, -0.14, 0.58);
  avatar.add(mustache);

  // boca (sorriso)
  const mouth = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.06, 0.05), mouthMat);
  mouth.position.set(0, -0.24, 0.6);
  avatar.add(mouth);

  // cavanhaque / barba no queixo
  const goatee = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.24, 0.1), hairMat);
  goatee.position.set(0, -0.42, 0.5);
  avatar.add(goatee);

  avatar.position.y = 0.5;
  scene.add(avatar);

  resize();

  // ---------- interação: arrastar para girar ----------
  let isDragging = false;
  let prevX = 0;
  let targetRotY = 0.3;
  let currentRotY = 0.3;

  renderer.domElement.addEventListener('pointerdown', (e) => {
    isDragging = true;
    prevX = e.clientX;
    renderer.domElement.style.cursor = 'grabbing';
  });
  window.addEventListener('pointerup', () => {
    isDragging = false;
    renderer.domElement.style.cursor = 'grab';
  });
  window.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - prevX;
    prevX = e.clientX;
    targetRotY += dx * 0.008;
  });

  // ---------- loop de animação ----------
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    if (!prefersReducedMotion && !isDragging) {
      targetRotY += 0.0032;
    }
    currentRotY += (targetRotY - currentRotY) * 0.08;
    avatar.rotation.y = currentRotY;

    if (!prefersReducedMotion) {
      avatar.position.y = 0.5 + Math.sin(t * 1.4) * 0.045;
    }

    renderer.render(scene, camera);
  }
  animate();
}
