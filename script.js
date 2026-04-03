document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // TYPING ANIMATION
    // =========================
    const typingElement = document.getElementById("typing");

    if (typingElement) {
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
            const currentText = roles[roleIndex];

            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex--);
            } else {
                typingElement.textContent = currentText.substring(0, charIndex++);
            }

            let speed = isDeleting ? 40 : 80;

            if (!isDeleting && charIndex === currentText.length) {
                speed = 1200;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                speed = 300;
            }

            setTimeout(typeEffect, speed);
        }

        typeEffect();
    }

    // =========================
    // SMOOTH SCROLL
    // =========================
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();

            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });

    // =========================
    // SCROLL REVEAL ANIMATION
    // =========================
    const revealElements = document.querySelectorAll(".reveal");

    function revealOnScroll() {
        const windowHeight = window.innerHeight;

        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;

            if (elementTop < windowHeight - 100) {
                el.classList.add("show");
            }
        });
    }

    window.addEventListener("scroll", revealOnScroll);

    // Trigger saat pertama load
    revealOnScroll();

});
