document.addEventListener("DOMContentLoaded", function () {

const typingElement = document.getElementById("typing");

if (typingElement) {
const roles = [
"Customer Experience Analyst",
"Data & Dashboard Specialist",
"Digital Marketing Professional",
"Partnership Specialist"
];

let i = 0;
let j = 0;
let isDeleting = false;

function typing() {
let current = roles[i];

if (isDeleting) {
j--;
} else {
j++;
}

typingElement.textContent = current.substring(0, j);

if (!isDeleting && j === current.length) {
isDeleting = true;
setTimeout(typing, 1000);
return;
}

if (isDeleting && j === 0) {
isDeleting = false;
i = (i + 1) % roles.length;
}

setTimeout(typing, isDeleting ? 50 : 100);
}

typing();
}

// REVEAL
const reveals = document.querySelectorAll(".reveal");

function showOnScroll() {
reveals.forEach(el => {
const top = el.getBoundingClientRect().top;
if (top < window.innerHeight - 100) {
el.classList.add("show");
}
});
}

window.addEventListener("scroll", showOnScroll);
showOnScroll();

});
