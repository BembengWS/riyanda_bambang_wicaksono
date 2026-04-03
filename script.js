document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // FLOATING CONTACT
    // =========================
    const contactBtn = document.getElementById("contactToggle");
    const contactPopup = document.getElementById("contactPopup");

    if (contactBtn && contactPopup) {

        // toggle popup
        contactBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            contactPopup.classList.toggle("show");
        });

        // klik luar = tutup
        document.addEventListener("click", (e) => {
            if (!contactPopup.contains(e.target) && e.target !== contactBtn) {
                contactPopup.classList.remove("show");
            }
        });
    }


    // =========================
    // 📊 ANIMATED COUNTER
    // =========================
    const counters = document.querySelectorAll(".counter");

    if (counters.length > 0) {

        const runCounter = (el) => {
            const target = +el.getAttribute("data-target") || 0;
            let count = 0;
            const speed = Math.max(target / 100, 1);

            const update = () => {
                count += speed;

                if (count < target) {
                    el.textContent = Math.floor(count);
                    requestAnimationFrame(update);
                } else {
                    el.textContent = target;
                }
            };

            update();
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    runCounter(entry.target);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.6 });

        counters.forEach(counter => observer.observe(counter));
    }


    // =========================
    // ✍️ TYPING EFFECT
    // =========================
    const typingEl = document.getElementById("typing");

    if (typingEl) {
        const words = [
            "Customer Experience Analyst",
            "Data & Dashboard Specialist",
            "Digital Marketing Professional",
            "Partnership & Marketplace Specialist"
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function loop() {
            const current = words[wordIndex];
            typingEl.textContent = current.substring(0, charIndex);

            if (!deleting) {
                charIndex++;
                if (charIndex > current.length) {
                    deleting = true;
                    setTimeout(loop, 1000);
                    return;
                }
            } else {
                charIndex--;
                if (charIndex < 0) {
                    deleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                    setTimeout(loop, 300);
                    return;
                }
            }

            setTimeout(loop, deleting ? 50 : 90);
        }

        loop();
    }


    // =========================
    // ✨ SCROLL REVEAL
    // =========================
    const reveals = document.querySelectorAll(".reveal");

    if (reveals.length > 0) {

        reveals.forEach((el, index) => {
            el.style.transitionDelay = `${index * 0.1}s`;
        });

        function reveal() {
            const h = window.innerHeight;

            reveals.forEach(el => {
                const top = el.getBoundingClientRect().top;

                if (top < h - 100) {
                    el.classList.add("show");
                }
            });
        }

        window.addEventListener("scroll", reveal);
        reveal();
    }


    // =========================
    // 🌙 DARK MODE
    // =========================
    const darkToggle = document.getElementById("darkToggle");

    if (darkToggle) {

        // load saved theme
        if (localStorage.getItem("theme") === "dark") {
            document.body.classList.add("dark");
            darkToggle.textContent = "☀️";
        }

        darkToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark");

            if (document.body.classList.contains("dark")) {
                localStorage.setItem("theme", "dark");
                darkToggle.textContent = "☀️";
            } else {
                localStorage.setItem("theme", "light");
                darkToggle.textContent = "🌙";
            }
        });
    }

});
