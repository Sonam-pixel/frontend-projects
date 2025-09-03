// Typing Effect
const typingElement = document.getElementById("typing");
const words = ["A Web Developer.", "A Problem Solver.", "An HTML/CSS Ninja.", "A JavaScript Enthusiast."];
let i = 0, j = 0, isDeleting = false;

function type() {
  const currentWord = words[i];
  typingElement.innerHTML = isDeleting
    ? currentWord.substring(0, j--)
    : currentWord.substring(0, j++);

  if (!isDeleting && j === currentWord.length + 1) {
    isDeleting = true;
    setTimeout(type, 1000);
  } else if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % words.length;
    setTimeout(type, 300);
  } else {
    setTimeout(type, isDeleting ? 50 : 150);
  }
}
type();


// Scroll to top button
const topBtn = document.getElementById("topBtn");
window.onscroll = () => {
  topBtn.style.display = window.scrollY > 200 ? "block" : "none";
};
topBtn.onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};


// Navbar Toggle (Mobile Menu)
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");
menuToggle.onclick = () => {
  navLinks.classList.toggle("active");
};


// Scroll Animation
function reveal() {
  const reveals = document.querySelectorAll(".reveal");
  for (let r of reveals) {
    const windowHeight = window.innerHeight;
    const elementTop = r.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      r.classList.add("active");
    }
  }
}
window.addEventListener("scroll", reveal);


// Dark Mode Toggle
const darkToggle = document.getElementById("darkModeToggle");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  darkToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

darkToggle.onclick = () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");

  // Save preference
  localStorage.setItem("theme", isDark ? "dark" : "light");

  // Change icon
  darkToggle.innerHTML = isDark
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
};
