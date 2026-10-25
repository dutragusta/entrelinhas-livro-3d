(() => {
  function initBook() {
    const book = document.querySelector("#book");
    const pages = Array.from(document.querySelectorAll(".page"));
    const prev = document.querySelector("#prev");
    const next = document.querySelector("#next");
    const count = document.querySelector("#page-count");
    const dots = document.querySelector("#page-dots");
    const restart = document.querySelector("#restart");
    const stage = document.querySelector(".book-stage");
    if (!book || !pages.length || !prev || !next || !count || !dots) return;

    const labels = ["CAPA", "01 / 05", "02 / 05", "03 / 05", "04 / 05", "05 / 05", "CONTRACAPA"];
    let current = 0;
    let startX = 0;
    let startY = 0;

    dots.replaceChildren();
    const dotButtons = pages.map((page, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "page-dot";
      dot.setAttribute("aria-label", index === 0 ? "Ir para a capa" : index === pages.length - 1 ? "Ir para a contracapa" : "Ir para a página " + index);
      dot.addEventListener("click", () => showPage(index));
      dots.appendChild(dot);
      return dot;
    });

    function showPage(index) {
      current = Math.max(0, Math.min(pages.length - 1, index));
      pages.forEach((page, i) => {
        const isCurrent = i === current;
        page.classList.toggle("active", isCurrent);
        page.setAttribute("aria-hidden", String(!isCurrent));
        page.style.display = isCurrent ? (i === 0 || i === pages.length - 1 ? "block" : "grid") : "none";
        page.style.visibility = isCurrent ? "visible" : "hidden";
        page.style.opacity = isCurrent ? "1" : "0";
        page.style.transform = isCurrent ? "rotateY(0deg)" : "none";
        page.style.zIndex = isCurrent ? "2" : "0";
      });
      dotButtons.forEach((dot, i) => {
        if (i === current) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });
      count.textContent = labels[current] || (current + " / " + (pages.length - 1));
      prev.disabled = current === 0;
      next.disabled = current === pages.length - 1;
      prev.setAttribute("aria-label", "Voltar uma página");
      next.setAttribute("aria-label", "Avançar uma página");
    }

    prev.addEventListener("click", () => showPage(current - 1));
    next.addEventListener("click", () => showPage(current + 1));
    restart?.addEventListener("click", event => {
      event.preventDefault();
      showPage(0);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    window.addEventListener("keydown", event => {
      if (["ArrowRight", "PageDown", " "].includes(event.key)) {
        if (event.target instanceof HTMLButtonElement) return;
        event.preventDefault();
        showPage(current + 1);
      } else if (["ArrowLeft", "PageUp"].includes(event.key)) {
        event.preventDefault();
        showPage(current - 1);
      } else if (event.key === "Home") showPage(0);
      else if (event.key === "End") showPage(pages.length - 1);
    });
    stage?.addEventListener("touchstart", event => {
      startX = event.changedTouches[0].clientX;
      startY = event.changedTouches[0].clientY;
    }, { passive: true });
    stage?.addEventListener("touchend", event => {
      const dx = event.changedTouches[0].clientX - startX;
      const dy = event.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) showPage(current + (dx < 0 ? 1 : -1));
    }, { passive: true });

    showPage(0);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initBook);
  else initBook();
})();