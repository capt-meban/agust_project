document.addEventListener('DOMContentLoaded', () => {
  createStars();

  const giftWrapper = document.getElementById('giftWrapper');
  giftWrapper.addEventListener('click', openGift);
});

let isOpened = false;

function openGift() {
  if (isOpened) return;
  isOpened = true;

  const giftWrapper = document.getElementById('giftWrapper');
  const revealedCard = document.getElementById('revealedCard');
  const presentTitle = document.getElementById('presentTitle');
  const presentSubtitle = document.getElementById('presentSubtitle');

  // 1. Animate Gift Opening
  giftWrapper.classList.add('opened');

  // 2. Trigger Hearts Explosion
  triggerHeartExplosion();

  // 3. Reveal Photo and Final Message
  setTimeout(() => {
    giftWrapper.classList.add('hidden');
    revealedCard.classList.remove('hidden');
    
    // Force reflow for smooth fade-in
    void revealedCard.offsetWidth;
    revealedCard.classList.add('show');

    presentTitle.innerText = "Forever & Always 💙";
    presentSubtitle.innerText = "The last page, but our journey continues...";
  }, 600);
}

/**
 * Creates a burst of glowing hearts when the gift is opened
 */
function triggerHeartExplosion() {
  const overlay = document.getElementById('gift-explosion');
  const heartIcons = ['💖', '💙', '✨', '🌸', '🌟', '💝'];
  const particleCount = 65;

  const startX = window.innerWidth / 2;
  const startY = window.innerHeight * 0.45;

  for (let i = 0; i < particleCount; i++) {
    setTimeout(() => {
      const p = document.createElement('div');
      p.classList.add('heart-particle');
      p.innerText = heartIcons[Math.floor(Math.random() * heartIcons.length)];

      p.style.left = `${startX}px`;
      p.style.top = `${startY}px`;

      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 220 + 50;

      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance - (Math.random() * 100); // Float upward slightly

      const duration = Math.random() * 0.8 + 1.2;

      p.style.fontSize = `${Math.random() * 0.8 + 1.2}rem`;
      p.style.setProperty('--dx', `${dx}px`);
      p.style.setProperty('--dy', `${dy}px`);
      p.style.setProperty('--duration', `${duration}s`);

      overlay.appendChild(p);

      setTimeout(() => p.remove(), duration * 1000);
    }, i * 10);
  }
}

/**
 * Creates background stars
 */
function createStars() {
  const container = document.getElementById('stars-container');
  const starCount = 40;

  for (let i = 0; i < starCount; i++) {
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