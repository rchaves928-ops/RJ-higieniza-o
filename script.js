// Menu mobile
(function () {
  const toggle = document.getElementById("navToggle");
  const nav = document.querySelector(".nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Fecha ao clicar em um item
  nav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
})();

// FAQ accordion simples
(function () {
  const faqRoot = document.querySelector("[data-accordion]");
  if (!faqRoot) return;

  const questions = faqRoot.querySelectorAll(".faq__q");
  questions.forEach((btn) => {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      const answer = btn.nextElementSibling;

      // fecha todos
      questions.forEach((b) => {
        b.setAttribute("aria-expanded", "false");
        const a = b.nextElementSibling;
        if (a) a.hidden = true;
        const icon = b.querySelector(".faq__icon");
        if (icon) icon.textContent = "+";
      });

      // abre o clicado, se não estava aberto
      if (!expanded) {
        btn.setAttribute("aria-expanded", "true");
        if (answer) answer.hidden = false;
        const icon = btn.querySelector(".faq__icon");
        if (icon) icon.textContent = "–";
      }
    });
    
  });
})();
(function () {
  const imgs = document.querySelectorAll(".js-lightbox");
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightboxImg");
  const lbClose = document.getElementById("lightboxClose");

  if (!imgs.length || !lb || !lbImg || !lbClose) return;

  function open(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt || "";
    lb.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function close() {
    lb.hidden = true;
    lbImg.src = "";
    document.body.style.overflow = "";
  }

  imgs.forEach((img) => img.addEventListener("click", () => open(img.src, img.alt)));

  lbClose.addEventListener("click", close);
  lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !lb.hidden) close(); });
})();



