// Theme Toggle
document.getElementById('theme-toggle').addEventListener('click', () => {
  localStorage.setItem('theme', document.documentElement.classList.toggle('dark') ? 'dark' : 'light');
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

// tsParticles
if (window.tsParticles) {
  
  // Light Mode
  tsParticles.load({
    id: 'tsParticlesLight',
    options: {
      fullScreen: { enable: false },
      particles: {
        number: { value: 20 },
        shape: { type: 'square' },
        color: { value: '#ffffff' },
        opacity: { value: 0.7 },
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
  
  // Dark Mode
  tsParticles.load({
    id: 'tsParticlesDark',
    options: {
      fullScreen: { enable: false },
      particles: {
        number: { value: 20 },
        shape: { type: 'square' },
        color: { value: '#000000' },
        opacity: { value: 0.7 },
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
