document.addEventListener('DOMContentLoaded', () => {
  createStars();
  initMicrophoneBlow(); // Enables blowing into phone mic

  const blowBtn = document.getElementById('blowBtn');
  const finalPageBtn = document.getElementById('finalPageBtn');

  blowBtn.addEventListener('click', blowOutCandle);

  finalPageBtn.addEventListener('click', () => {
    window.location.href = 'last.html';
  });
});

let isBlown = false;

function blowOutCandle() {
  if (isBlown) return;
  isBlown = true;

  const flame = document.getElementById('flame');
  const smoke = document.getElementById('smoke');
  const ambientGlow = document.getElementById('ambientGlow');
  const wishTitle = document.getElementById('wishTitle');
  const wishSubtitle = document.getElementById('wishSubtitle');
  const blowBtn = document.getElementById('blowBtn');
  const finalPageBtn = document.getElementById('finalPageBtn');

  // 1. Extinguish Flame & Ambient Glow
  flame.classList.add('off');
  smoke.classList.add('active');
  ambientGlow.style.opacity = '0';

  // 2. Hide Blow Button
  blowBtn.classList.add('hidden');

  // 3. Update Text
  wishTitle.innerText = "sngi kha basuk love 💙✨";
  wishTitle.classList.add('blessed');
  wishSubtitle.style.opacity = '0';

  // 4. TRIGGER MASSIVE CELEBRATION EFFECT (Balloons, Stars, Confetti, Hearts)
  triggerGrandCelebration();

  // 5. Reveal Final Surprise Button
  setTimeout(() => {
    finalPageBtn.classList.remove('hidden');
  }, 2200);
}

/**
 * Microphone Detection: Blow into phone mic to blow out candle
 */
function initMicrophoneBlow() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return;

  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

      analyser.smoothingTimeConstant = 0.8;
      analyser.fftSize = 1024;

      microphone.connect(analyser);
      analyser.connect(scriptProcessor);
      scriptProcessor.connect(audioContext.destination);

      scriptProcessor.onaudioprocess = () => {
        if (isBlown) return;

        const array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        let values = 0;

        for (let i = 0; i < array.length; i++) {
          values += array[i];
        }

        const average = values / array.length;

        // If wind noise threshold exceeded (blowing action)
        if (average > 48) {
          blowOutCandle();
          // Stop mic stream after blown
          stream.getTracks().forEach(track => track.stop());
        }
      };
    })
    .catch(() => {
      // Microphone access denied or unsupported; tap button fallback remains active seamlessly
    });
}

/**
 * Massive Particle Explosion (Balloons, Stars, Confetti & Hearts)
 */
function triggerGrandCelebration() {
  const overlay = document.getElementById('celebration-overlay');
  const celebrationIcons = ['🎈', '⭐', '✨', '💖', '💙', '🎉', '🌟', '🥳', '🌸'];
  const particleCount = 110;

  for (let i = 0; i < particleCount; i++) {
    setTimeout(() => {
      const p = document.createElement('div');
      p.classList.add('celebration-particle');
      p.innerText = celebrationIcons[Math.floor(Math.random() * celebrationIcons.length)];

      // Start position: Center screen near the cake
      const startX = window.innerWidth / 2;
      const startY = window.innerHeight * 0.55;

      p.style.left = `${startX}px`;
      p.style.top = `${startY}px`;

      // Explode outward in 360 degrees + fall down
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 280 + 60;
      
      const dx = Math.cos(angle) * distance;
      const dy = (Math.sin(angle) * distance) + (Math.random() * 350 + 150); // Gravity drop

      const duration = Math.random() * 1.2 + 1.2; // 1.2s to 2.4s
      const size = Math.random() * 0.8 + 1.1; // Dynamic sizes

      p.style.fontSize = `${size}rem`;
      p.style.setProperty('--dx', `${dx}px`);
      p.style.setProperty('--dy', `${dy}px`);
      p.style.setProperty('--duration', `${duration}s`);

      overlay.appendChild(p);

      setTimeout(() => p.remove(), duration * 1000);
    }, i * 15); // Rapid wave burst
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