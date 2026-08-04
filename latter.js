document.addEventListener('DOMContentLoaded', () => {
  createStars();

  const nextBtn = document.getElementById('nextBtn');
  nextBtn.addEventListener('click', () => {
    // Navigates to the final surprise page (e.g., page4.html)
    window.location.href = 'cake.html';
  });
});

/**
 * Creates twinkling stars in the background
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