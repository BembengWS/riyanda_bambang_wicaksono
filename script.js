document.addEventListener("DOMContentLoaded", function () {
    // =========================
// FLOATING CONTACT
// =========================
const contactBtn = document.getElementById("contactToggle");
const contactPopup = document.getElementById("contactPopup");

if (contactBtn) {
    contactBtn.addEventListener("click", () => {
        contactPopup.classList.toggle("show");
    });
}
    // =========================
// 📊 ANIMATED COUNTER
// =========================
const counters = document.querySelectorAll(".counter");

const runCounter = (el) => {
    const target = +el.getAttribute("data-target");
    let count = 0;

    const speed = target / 100;

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

// trigger pas muncul di layar
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            runCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.6 });

counters.forEach(counter => {
    observer.observe(counter);
});

    // =========================
    // TYPING
    // =========================
    const el = document.getElementById("typing");

    if (el) {
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
            el.textContent = current.substring(0, charIndex);

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
    // SCROLL REVEAL + STAGGER
    // =========================
    const reveals = document.querySelectorAll(".reveal");

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


    // =========================
    // DARK MODE (FIXED)
    // =========================
    const toggle = document.getElementById("darkToggle");

    if (toggle) {

        // load saved theme
        if (localStorage.getItem("theme") === "dark") {
            document.body.classList.add("dark");
            toggle.textContent = "☀️";
        }

        toggle.addEventListener("click", () => {
            document.body.classList.toggle("dark");

            if (document.body.classList.contains("dark")) {
                localStorage.setItem("theme", "dark");
                toggle.textContent = "☀️";
            } else {
                localStorage.setItem("theme", "light");
                toggle.textContent = "🌙";
            }
        });
    }

});
