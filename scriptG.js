document.addEventListener('DOMContentLoaded', () => {
  createStars();

  const releaseBtn = document.getElementById('releaseBtn');
  releaseBtn.addEventListener('click', releaseBalloonsSequence);
});

function createStars() {
  const container = document.getElementById('stars-container');
  for (let i = 0; i < 40; i++) {
    const star = document.createElement('div');
    star.classList.add('star');

    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    const size = Math.random() * 2 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.setProperty('--duration', `${Math.random() * 3 + 2}s`);
    star.style.setProperty('--delay', `${Math.random() * 3}s`);

    container.appendChild(star);
  }
}

function releaseBalloonsSequence() {
  const sky = document.getElementById('balloon-sky');
  const releaseBtn = document.getElementById('releaseBtn');
  
  // Disable button during animation
  releaseBtn.style.pointerEvents = 'none';
  releaseBtn.style.opacity = '0.5';

  const balloonEmojis = ['🎈', '💙', '🎈', '✨', '🎈'];
  const totalBalloons = 22;

  // Stream of flying balloons
  for (let i = 0; i < totalBalloons; i++) {
    setTimeout(() => {
      const b = document.createElement('div');
      b.classList.add('flying-balloon');
      b.innerText = balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)];
      
      b.style.left = `${Math.random() * 85 + 5}%`;
      b.style.setProperty('--speed', `${Math.random() * 2 + 3}s`);

      sky.appendChild(b);

      setTimeout(() => b.remove(), 5000);
    }, i * 120);
  }

  // Spawn the final target balloon
  setTimeout(() => {
    spawnInteractiveBalloon(sky);
  }, 2600);
}

function spawnInteractiveBalloon(container) {
  const targetBalloon = document.createElement('div');
  targetBalloon.classList.add('interactive-balloon');
  
  targetBalloon.innerHTML = `
    <div class="balloon-emoji">🎈</div>
    <div class="pop-tag">Pop me! 💥</div>
  `;

  // Click handler: Massive Star Explosion
  targetBalloon.addEventListener('click', (e) => {
    const rect = targetBalloon.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    targetBalloon.style.display = 'none';

    // 1. Flash effect
    triggerScreenBlast();

    // 2. MASSIVE STAR SHOWER (120+ stars in multi-stage waves)
    triggerMassiveStarShower(centerX, centerY);

    // 3. Smooth transition to Page 3
    setTimeout(() => {
      window.location.href = 'latter.html';
    }, 1800);
  });

  container.appendChild(targetBalloon);
}

function triggerScreenBlast() {
  const flash = document.createElement('div');
  flash.classList.add('screen-blast-flash');
  document.body.appendChild(flash);

  setTimeout(() => flash.remove(), 600);
}

/**
 * Spawns a TON of stars showering down from both explosion center & top sky
 */
function triggerMassiveStarShower(originX, originY) {
  const starIcons = ['⭐', '✨', '🌟', '💫', '💙'];
  
  // Wave 1: Burst outwards from the popped balloon (80 Stars)
  for (let i = 0; i < 80; i++) {
    setTimeout(() => {
      spawnSingleFallingStar(originX, originY, starIcons, true);
    }, i * 8); // Rapid sequential explosion
  }

  // Wave 2: Full screen rainfall from top sky (50 Stars)
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const randomTopX = Math.random() * window.innerWidth;
      const randomTopY = Math.random() * (window.innerHeight * 0.3);
      spawnSingleFallingStar(randomTopX, randomTopY, starIcons, false);
    }, 150 + i * 15);
  }
}

/**
 * Helper to spawn an individual falling star with random physics
 */
function spawnSingleFallingStar(startX, startY, starIcons, isExplosion) {
  const p = document.createElement('div');
  p.classList.add('falling-star-particle');
  p.innerText = starIcons[Math.floor(Math.random() * starIcons.length)];

  p.style.left = `${startX}px`;
  p.style.top = `${startY}px`;

  // Physics calculation
  const angle = Math.random() * Math.PI * 2;
  const distance = isExplosion ? (Math.random() * 260 + 40) : (Math.random() * 80);
  
  const dx = Math.cos(angle) * distance;
  // Gravity pulls stars down deep past screen bottom
  const dy = (Math.sin(angle) * distance) + (Math.random() * 400 + 300);

  const duration = Math.random() * 0.8 + 1.0; // 1.0s to 1.8s

  p.style.setProperty('--dx', `${dx}px`);
  p.style.setProperty('--dy', `${dy}px`);
  p.style.setProperty('--duration', `${duration}s`);

  document.body.appendChild(p);

  setTimeout(() => p.remove(), duration * 1000);
}