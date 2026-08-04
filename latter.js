document.addEventListener("DOMContentLoaded", () => {
  generateBackgroundStars();

  const nextBtn = document.getElementById("nextBtn");
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      // Fade out effect
      document.body.style.transition = "opacity 0.5s ease";
      document.body.style.opacity = "0";

      // Navigate to page4.html (Cake cutting)
      setTimeout(() => {
        window.location.href = "cake.html";
      }, 500);
    });
  }
});

/**
 * Generates 100 background stars
 */
function generateBackgroundStars() {
  const starsContainer = document.getElementById("stars-container");
  if (!starsContainer) return;

  for (let i = 0; i < 100; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    const size = Math.random() * 3 + 1;
    star.style.width = size + "px";
    star.style.height = size + "px";

    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";

    star.style.animationDuration = (2 + Math.random() * 5) + "s";

    starsContainer.appendChild(star);
  }
}