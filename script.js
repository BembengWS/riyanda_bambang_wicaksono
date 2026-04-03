document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // TYPING ANIMATION (FIXED)
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
                charIndex--;
            } else {
                charIndex++;
            }

            typingElement.textContent = currentText.substring(0, charIndex);

            let speed = isDeleting ? 50 : 90;

            // kalau selesai ngetik
            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                speed = 1200;
            }

            // kalau sudah kehapus semua
            if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                speed = 300;
            }

            setTimeout(typeEffect, speed);
        }

        // START
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
    // SCROLL REVEAL
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
    revealOnScroll();

});
