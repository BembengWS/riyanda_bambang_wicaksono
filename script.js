document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // TYPING TEXT ANIMATION
  // =========================
  const typingElement = document.getElementById("typing");

  const roles = [
    "Customer Experience Analyst",
    "Data & Dashboard Specialist",
    "Digital Marketing Professional",
    "Partnership & Marketplace Specialist"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex--);
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex++);
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentRole.length) {
      speed = 1500;
      isDeleting = true;
    } 
    else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 300;
    }

    setTimeout(typeEffect, speed);
  }

  if (typingElement) {
    typeEffect();
  }

  // =========================
  // SMOOTH SCROLL NAVIGATION
  // =========================
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);

      if (target) {
        target.scrollIntoView({
          behavior: "smooth"
        });
      }
    });
  });

  // =========================
  // SCROLL REVEAL ANIMATION
  // =========================
  const reveals = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    const windowHeight = window.innerHeight;

    reveals.forEach(el => {
      const revealTop = el.getBoundingClientRect().top;

      if (revealTop < windowHeight - 80) {
        el.classList.add("show");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);

  // run once on load
  revealOnScroll();

});


// AUTO ADD REVEAL CLASS
document.querySelectorAll("section, .card, .skill-card").forEach(el => {
  el.classList.add("reveal");
});

// NAVBAR SCROLL EFFECT
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// DARK MODE TOGGLE
const toggle = document.getElementById("darkToggle");

if(toggle){
  toggle.addEventListener("click", (e) => {
    e.preventDefault();
    document.body.classList.toggle("dark");
  });
}

// ACTIVE NAV LINK
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});
