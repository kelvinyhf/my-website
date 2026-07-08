// tsParticles
function refreshColor() {
  const isDark = document.documentElement.classList.contains('dark');
  return isDark ? '#fff' : '#000';
}

// fallingPixel
if (window.tsParticles) {
  tsParticles.load({
    id: 'fallingPixel',
    options: {
      fullScreen: { enable: false },
      particles: {
        number: { value: 20 },
        shape: { type: 'square' },
        color: { value: refreshColor() },
        opacity: { value: 0.05 },
        size: { value: { min: 4, max: 8 } },
        move: {
          enable: true,
          speed: 2,
          direction: 'bottom',
          outModes: { default: 'out' }
        }
      }
    }
  });
}

// Theme Toggle
document.getElementById('theme-toggle').addEventListener('click', () => {
  
  // Update theme in storage
  localStorage.setItem('theme', document.documentElement.classList.toggle('dark') ? 'dark' : 'light');
  
  // Update fallingPixel's color
  const container = tsParticles.domItem(0);
  container.options.load({ particles: { color: { value: refreshColor() } } });
  container.refresh();
  
});

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

// Energy +1
const maxEnergy = 5;
let energy = sessionStorage.getItem('energy') !== null ? parseInt(sessionStorage.getItem('energy')) : maxEnergy;
let counter = 0;

setInterval(() => {
  if (energy + counter < maxEnergy) {
    counter++;
    sessionStorage.setItem('counter', counter);
  }
}, 20000);
