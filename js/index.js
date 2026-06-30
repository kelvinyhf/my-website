// Theme Toggle
document.getElementById('theme-toggle').addEventListener('click', () => {
  localStorage.setItem('theme', document.documentElement.classList.toggle('dark') ? 'dark' : 'light');
});

// tsParticles
if (window.tsParticles) {
  
  // Light Mode
  tsParticles.load({
    id: 'tsParticlesLight',
    options: {
      fullScreen: { enable: false },
      particles: {
        number: { value: 15 },
        shape: { type: 'square' },
        color: { value: '#ffffff' },
        opacity: { value: 0.75 },
        size: { value: { min: 3, max: 6 } },
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
        number: { value: 15 },
        shape: { type: 'square' },
        color: { value: '#111111' },
        opacity: { value: 0.75 },
        size: { value: { min: 3, max: 6 } },
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
