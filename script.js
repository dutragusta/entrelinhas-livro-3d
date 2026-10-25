(() => {
  const experience = document.querySelector(".reading-experience");
  const steps = [...document.querySelectorAll(".story-step")];
  const leaves = [...document.querySelectorAll(".book-leaf")];
  const progressBar = document.querySelector("#book-progress-bar");
  const caption = document.querySelector("#book-caption-text");
  if (!experience || !steps.length || !leaves.length) return;

  const captions = [
    "A CAPA É SÓ O COMEÇO",
    "A PRIMEIRA VIRADA",
    "NOVAS IDEIAS APARECEM",
    "CADA PÁGINA MUDA A PERSPECTIVA",
    "QUASE NO FIM DO CAPÍTULO",
    "A HISTÓRIA CONTINUA"
  ];
  let ticking = false;
  let activeIndex = -1;

  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  const ease = (t) => t * t * (3 - 2 * t);

  function updateOnScroll() {
    const rect = experience.getBoundingClientRect();
    const scrollable = Math.max(1, rect.height - window.innerHeight);
    const progress = clamp(-rect.top / scrollable, 0, 1);
    const pagePosition = progress * (steps.length - 1);
    const index = clamp(Math.round(pagePosition), 0, steps.length - 1);

    // Cada folha gira em 3D conforme a rolagem atravessa o seu intervalo.
    // A rolagem para cima reverte naturalmente a animação.
    leaves.forEach((leaf, i) => {
      const turnProgress = clamp(progress * leaves.length - i * (leaves.length / (steps.length - 1)), 0, 1);
      const angle = -180 * ease(turnProgress);
      leaf.style.transform = `rotateY(${angle}deg)`;
      leaf.style.zIndex = String(leaves.length - i + (turnProgress > 0.5 ? 10 : 0));
    });

    if (index !== activeIndex) {
      activeIndex = index;
      steps.forEach((step, i) => {
        const isActive = i === index;
        step.classList.toggle("is-active", isActive);
        if (isActive) step.setAttribute("aria-current", "step");
        else step.removeAttribute("aria-current");
      });
      caption.textContent = captions[index] || captions[captions.length - 1];
    }
    progressBar.style.width = `${progress * 100}%`;
    ticking = false;
  }

  function requestUpdate() {
    if (!ticking) {
      window.requestAnimationFrame(updateOnScroll);
      ticking = true;
    }
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  updateOnScroll();
})();