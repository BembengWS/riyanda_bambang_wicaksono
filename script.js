document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // TYPING (SUPER STABLE)
    // =========================
    const el = document.getElementById("typing");

    if (!el) {
        console.error("Element #typing tidak ditemukan");
        return;
    }

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

        // update text
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


    // =========================
    // SCROLL REVEAL (SAFE)
    // =========================
    const reveals = document.querySelectorAll(".reveal");

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

});
