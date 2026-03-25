// ===== TYPING SAFE =====
const typingElement = document.getElementById("typing");

if (typingElement) {
  const text = ["Customer Experience Analyst", "Data Enthusiast"];
  let i = 0, j = 0, del = false;

  function type() {
    let current = text[i];
    typingElement.textContent = current.slice(0, j);

    if (!del) {
      j++;
      if (j > current.length) {
        del = true;
        setTimeout(type, 1000);
        return;
      }
    } else {
      j--;
      if (j < 0) {
        del = false;
        i = (i + 1) % text.length;
      }
    }

    setTimeout(type, del ? 50 : 100);
  }

  type();
}


// ===== SAFE REVEAL (ANTI BLANK) =====
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;

    if (top < window.innerHeight - 100) {
      el.classList.add("show");
    }
  });
}

// 🔥 INI KUNCI NYA
window.addEventListener("DOMContentLoaded", () => {
  revealOnScroll(); // langsung munculin
});

window.addEventListener("scroll", revealOnScroll);
