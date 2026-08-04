document.addEventListener("DOMContentLoaded", () => {
  generateBackgroundStars();

  const startBtn = document.getElementById("startBtn");
  startBtn.addEventListener("click", () => {
    // Smooth transition to Page 2
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "0";

    setTimeout(() => {
      window.location.href = "gallary.html";
    }, 500);
  });
});

/**
 * Generates 120 twinkling background stars with random positioning
 */
function generateBackgroundStars() {
  const starsContainer = document.getElementById("stars-container");

  for (let i = 0; i < 120; i++) {
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