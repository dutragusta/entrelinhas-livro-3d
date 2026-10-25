(() => {
  const pages = [...document.querySelectorAll(".page")];
  const prev = document.querySelector("#prev");
  const next = document.querySelector("#next");
  const count = document.querySelector("#page-count");
  const dots = document.querySelector("#page-dots");
  const stage = document.querySelector(".book-stage");
  const restart = document.querySelector("#restart");
  if (!pages.length || !prev || !next || !dots) return;

  const labels = ["CAPA", "01 / 06", "02 / 06", "03 / 06", "04 / 06", "05 / 06", "CONTRACAPA"];
  let current = 0;
  let touchStartX = 0;
  let touchStartY = 0;
  let wheelLock = false;

  pages.forEach((page, i) => {
    page.style.visibility = "visible";
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "page-dot";
    dot.setAttribute("aria-label", i === 0 ? "Ir para a capa" : i === pages.length - 1 ? "Ir para a contracapa" : `Ir para a página ${i}`);
    dot.addEventListener("click", () => goTo(i));
    dots.appendChild(dot);
  });

  function render() {
    pages.forEach((page, i) => {
      const turned = i < current;
      page.style.transform = turned ? "rotateY(-180deg)" : "rotateY(0deg)";
      page.style.zIndex = String(turned ? i + 1 : pages.length - i + 10);
      page.classList.toggle("active", i === current);
      page.setAttribute("aria-hidden", i === current ? "false" : "true");
    });
    [...dots.children].forEach((dot, i) => {
      if (i === current) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
    count.textContent = labels[current] || `${current} / ${pages.length - 1}`;
    prev.disabled = current === 0;
    next.disabled = current === pages.length - 1;
    prev.setAttribute("aria-label", "Voltar uma página");
    next.setAttribute("aria-label", "Avançar uma página");
  }

  function goTo(index) {
    current = Math.max(0, Math.min(pages.length - 1, index));
    render();
  }
  prev.addEventListener("click", () => goTo(current - 1));
  next.addEventListener("click", () => goTo(current + 1));
  restart?.addEventListener("click", (event) => {
    event.preventDefault();
    goTo(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight" || event.key === "PageDown") {
      event.preventDefault();
      goTo(current + 1);
    } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
      event.preventDefault();
      goTo(current - 1);
    } else if (event.key === "Home") {
      goTo(0);
    } else if (event.key === "End") {
      goTo(pages.length - 1);
    }
  });

  stage.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].clientX;
    touchStartY = event.changedTouches[0].clientY;
  }, { passive: true });
  stage.addEventListener("touchend", (event) => {
    const dx = event.changedTouches[0].clientX - touchStartX;
    const dy = event.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) goTo(current + (dx < 0 ? 1 : -1));
  }, { passive: true });

  stage.addEventListener("wheel", (event) => {
    if (wheelLock || Math.abs(event.deltaY) < 18 && Math.abs(event.deltaX) < 18) return;
    const delta = Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
    if ((delta > 0 && current < pages.length - 1) || (delta < 0 && current > 0)) {
      event.preventDefault();
      goTo(current + (delta > 0 ? 1 : -1));
      wheelLock = true;
      window.setTimeout(() => { wheelLock = false; }, 850);
    }
  }, { passive: false });

  render();
})();