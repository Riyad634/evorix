document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav");
  const burger = document.querySelector(".burger");
  const menu = document.querySelector("#menu");
  const menuLinks = document.querySelectorAll("#menu a");
  const form = document.querySelector("#notifyForm");
  const emailInput = document.querySelector("#notifyEmail");
  const message = document.querySelector(".news-msg");
  const year = document.querySelector("#year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const updateNavbar = () => {
    if (!nav) return;
    nav.classList.toggle("scrolled", window.scrollY > 12);
  };

  updateNavbar();
  window.addEventListener("scroll", updateNavbar, { passive: true });

  const closeMenu = () => {
    if (!burger || !menu) return;

    burger.setAttribute("aria-expanded", "false");
    menu.classList.remove("open");
    document.body.classList.remove("menu-open");
  };

  if (burger && menu) {
    burger.addEventListener("click", () => {
      const isOpen = burger.getAttribute("aria-expanded") === "true";

      burger.setAttribute("aria-expanded", String(!isOpen));
      menu.classList.toggle("open", !isOpen);
      document.body.classList.toggle("menu-open", !isOpen);
    });

    menuLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  }

  if (form && emailInput && message) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const email = emailInput.value.trim();
      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      message.classList.remove("success", "error");

      if (!email) {
        message.textContent = "Please enter your email address.";
        message.classList.add("error");
        emailInput.focus();
        return;
      }

      if (!validEmail) {
        message.textContent = "Please enter a valid email address.";
        message.classList.add("error");
        emailInput.focus();
        return;
      }

      const button = form.querySelector('button[type="submit"]');
      const originalButtonText = button.textContent;

      button.disabled = true;
      button.textContent = "Submitting...";

      window.setTimeout(() => {
        message.textContent =
          "Thank you! You are on the Evo AI Robot pre-launch list.";
        message.classList.add("success");

        form.reset();
        button.disabled = false;
        button.textContent = originalButtonText;
      }, 650);
    });

    emailInput.addEventListener("input", () => {
      if (message.textContent) {
        message.textContent = "";
        message.classList.remove("success", "error");
      }
    });
  }
});
