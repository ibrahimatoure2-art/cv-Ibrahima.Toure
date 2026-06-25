document.addEventListener("DOMContentLoaded", () => {
  /* BARRES DE PROGRESSION DES LANGUES */
  document.querySelectorAll(".progress-bar").forEach(bar => {
    bar.style.setProperty("--target-width", bar.style.width);
    bar.style.width = "0%";
 
    new IntersectionObserver(([entry], obs) => {
      if (entry.isIntersecting) {
        setTimeout(() => bar.classList.add("animated"), 200);
        obs.unobserve(bar);
      }
    }, { threshold: 0.5 }).observe(bar);
  });
 
  /*APPARITION AU SCROLL (fade-up) */
  const fades = document.querySelectorAll(".fade-up");
 
  const fadeObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
 
  fades.forEach(el => fadeObs.observe(el));
  /* COPIE AU CLIC SUR LES CONTACTS */
  document.querySelectorAll(".contact-item").forEach(item => {
    item.addEventListener("click", () => {
      const tooltip = item.getAttribute("data-tooltip");
      if (tooltip.includes("numéro")) {
        copyText("+221 78 303 85 75", item, "Numéro copié !");
      } else if (tooltip.includes("email")) {
        copyText("ibrahima.toure@gmail.com", item, "Email copié !");
      }
    });
  });
 
  function copyText(text, el, msg) {
    navigator.clipboard.writeText(text).then(() => {
      const original = el.getAttribute("data-tooltip");
      el.setAttribute("data-tooltip", msg);
      setTimeout(() => el.setAttribute("data-tooltip", original), 2000);
    });
  }
  /* BOUTON RETOUR EN HAUT */
  const btn = document.createElement("button");
  btn.id = "back-to-top";
  btn.innerHTML = "&#8679;";
  btn.title = "Retour en haut";
  document.body.appendChild(btn);
 
  window.addEventListener("scroll", () =>
    btn.classList.toggle("show", window.scrollY > 200)
  );
 
  btn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );
 
 
  /* EFFET DE FRAPPE SUR LE STATUT */
  const statut = document.querySelector(".statut");
  if (statut) {
    const fullText = statut.textContent.trim();
    statut.textContent = "";
    statut.style.borderRight = "2px solid #005792";
 
    let i = 0;
    const typing = setInterval(() => {
      statut.textContent += fullText[i++];
      if (i >= fullText.length) {
        clearInterval(typing);
        setTimeout(() => statut.style.borderRight = "none", 1500);
      }
    }, 60);
  }
 
});