// Sleep functions
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const sleepR = (min, max) => new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * (max - min + 1)) + min));

// Fade In Effect
document.addEventListener("DOMContentLoaded", () => {
  
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.35
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  const hiddenElements = document.querySelectorAll(".fade-in");
  hiddenElements.forEach(el => observer.observe(el));
  
});
