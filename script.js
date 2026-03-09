(function () {
  "use strict";

  const header = document.getElementById("header");
  const hero = document.querySelector(".hero");
  const heroBg = document.querySelector(".hero-bg");
  const navLinks = document.querySelector(".nav-links");
  const navToggle = document.querySelector(".nav-toggle");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".card");

  // Sticky navbar: add .scrolled when user scrolls
  function updateHeaderOnScroll() {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  // Parallax: hero background follows scroll (skip if user prefers reduced motion)
  function updateParallax() {
    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var y = window.scrollY * 0.25;
    hero.style.setProperty("--parallax-y", y + "px");
  }

  window.addEventListener("scroll", function () {
    updateHeaderOnScroll();
    updateParallax();
  });
  updateHeaderOnScroll();
  updateParallax();

  // Hero image: mouse-follow parallax + spotlight (skip if reduced motion)
  var heroImage = document.querySelector(".hero-image");
  var heroSpotlight = document.getElementById("hero-spotlight");
  if (hero && heroImage && heroSpotlight && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var heroParallax = 18;
    hero.addEventListener("mousemove", function (e) {
      var rect = hero.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      hero.style.setProperty("--hero-x", -x * heroParallax + "px");
      hero.style.setProperty("--hero-y", -y * heroParallax + "px");
      hero.style.setProperty("--spot-x", (e.clientX - rect.left) + "px");
      hero.style.setProperty("--spot-y", (e.clientY - rect.top) + "px");
    });
    hero.addEventListener("mouseleave", function () {
      hero.style.setProperty("--hero-x", "0px");
      hero.style.setProperty("--hero-y", "0px");
    });
  }

  // Scroll reveal: add .visible when section enters viewport
  var revealEls = document.querySelectorAll(".reveal");
  if (typeof IntersectionObserver !== "undefined" && revealEls.length) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  // Card tilt: subtle 3D follow on mouse move (skip if user prefers reduced motion)
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!prefersReducedMotion) {
    cards.forEach(function (card) {
      var imgWrap = card.querySelector(".card-image");
      if (!imgWrap) return;
      card.addEventListener("mousemove", function (e) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;
        var tiltX = y * 6;
        var tiltY = -x * 6;
        card.style.transform = "perspective(800px) rotateX(" + tiltX + "deg) rotateY(" + tiltY + "deg) translateY(-4px)";
      });
      card.addEventListener("mouseleave", function () {
        card.style.transform = "";
      });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        navLinks.classList.remove("open");
      }
    });
  });

  // Mobile menu toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });
  }

  // Project filter
  if (filterBtns.length && cards.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const filter = this.getAttribute("data-filter");
        filterBtns.forEach(function (b) {
          b.classList.toggle("active", b === btn);
        });
        cards.forEach(function (card) {
          const category = card.getAttribute("data-category");
          const show = filter === "all" || category === filter;
          card.classList.toggle("hidden", !show);
        });
      });
    });
  }

  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
