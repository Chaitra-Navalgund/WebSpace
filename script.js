// Week 3: Integrating JavaScript for Interactive User Experience
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile navigation menu
  const menuToggle = document.querySelector("#menuToggle");
  const navLinks = document.querySelector("#navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    });
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
      });
    });
  }

  // 2. Light/dark theme switcher
  const themeToggle = document.querySelector("#themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = document.body.classList.toggle("dark-theme");
      themeToggle.setAttribute("aria-pressed", String(isDark));
      themeToggle.textContent = isDark ? "☀️ Light mode" : "🌙 Dark mode";
    });
  }

  // 3. Live feature search
  const featureSearch = document.querySelector("#featureSearch");
  const featureCards = [...document.querySelectorAll(".feature-card")];
  const searchStatus = document.querySelector("#searchStatus");
  const noResults = document.querySelector("#noResults");

  if (featureSearch) {
    featureSearch.addEventListener("input", () => {
      const query = featureSearch.value.trim().toLowerCase();
      let visibleCount = 0;
      featureCards.forEach((card) => {
        const searchableText = `${card.textContent} ${card.dataset.search || ""}`.toLowerCase();
        const matches = searchableText.includes(query);
        card.hidden = !matches;
        if (matches) visibleCount += 1;
      });
      if (searchStatus) searchStatus.textContent = query
        ? `Found ${visibleCount} of ${featureCards.length} features.`
        : `Showing all ${featureCards.length} features.`;
      if (noResults) noResults.hidden = visibleCount !== 0;
    });
  }

  // 4. Feature card feedback toast
  const toast = document.querySelector("#toast");
  let toastTimeout;
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimeout);
    toastTimeout = window.setTimeout(() => toast.classList.remove("show"), 3200);
  }
  document.querySelectorAll("[data-message]").forEach((button) => {
    button.addEventListener("click", () => showToast(button.dataset.message));
  });

  // 5. Contact form validation
  const contactForm = document.querySelector("#contactForm");
  const formStatus = document.querySelector("#formStatus");
  const fields = {
    name: {
      input: document.querySelector("#name"),
      error: document.querySelector("#nameError"),
      validate: (value) => value.trim().length >= 2 ? "" : "Please enter at least 2 characters."
    },
    email: {
      input: document.querySelector("#email"),
      error: document.querySelector("#emailError"),
      validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
        ? "" : "Please enter a valid email address."
    },
    message: {
      input: document.querySelector("#message"),
      error: document.querySelector("#messageError"),
      validate: (value) => value.trim().length >= 10 ? "" : "Please enter at least 10 characters."
    }
  };

  function validateField(field) {
    const errorMessage = field.validate(field.input.value);
    field.error.textContent = errorMessage;
    field.input.setAttribute("aria-invalid", String(Boolean(errorMessage)));
    return !errorMessage;
  }

  Object.values(fields).forEach((field) => {
    field.input.addEventListener("blur", () => validateField(field));
    field.input.addEventListener("input", () => {
      if (field.input.hasAttribute("aria-invalid")) validateField(field);
    });
  });

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const isValid = Object.values(fields).map(validateField).every(Boolean);
      if (!isValid) {
        formStatus.textContent = "Please correct the highlighted fields and try again.";
        formStatus.className = "form-status error";
        const firstInvalid = contactForm.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }
      formStatus.textContent = "Success! Your form passed validation. This demo does not send your data.";
      formStatus.className = "form-status success";
      contactForm.reset();
      Object.values(fields).forEach((field) => {
        field.error.textContent = "";
        field.input.removeAttribute("aria-invalid");
      });
    });
  }
});
