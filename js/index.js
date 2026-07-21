// tsParticles
function refreshColor() {
  const isDark = document.documentElement.classList.contains('dark');
  return isDark ? '#dc3e42' : '#ec5d5e';
}

// tsParticles
async function initParticles() {
  if (window.tsParticles && window.loadSlim) {
    await loadSlim(tsParticles);
    
    // fallingPixel
    await tsParticles.load({
      id: 'fallingPixel',
      options: {
        fullScreen: { enable: false },
        particles: {
          number: { value: 20 },
          shape: { type: 'square' },
          color: { value: refreshColor() },
          opacity: { value: { min: 0.05, max: 0.1 } },
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
}
initParticles();

// Theme Toggle
document.getElementById('theme-toggle').addEventListener('click', () => {
  
  // Update theme in storage
  localStorage.setItem('theme', document.documentElement.classList.toggle('dark') ? 'dark' : 'light');
  
  // Update fallingPixel's color
  const container = tsParticles.domItem(0);
  container.options.load({ particles: { color: { value: refreshColor() } } });
  container.refresh();
  
});

// Copy div for infinite scroll effect
document.addEventListener("DOMContentLoaded", () => {
  const floatingCardsGroups = document.querySelectorAll('.floating-cards-groups');
  floatingCardsGroups.forEach(group => {
    
    // Random Y Offset
    const floatingCards = group.querySelectorAll('.floating-card');
    floatingCards.forEach(card => {
      
      const floatY = random(0, 1) === 0 ? random(20, 30) : -random(20, 30);
      card.style.setProperty('--float-y', `${floatY}px`);
      
      const floatDur = random(3, 6)
      card.style.setProperty('--float-dur', `${floatDur}s`)
      
    });
    
    // Clone before
    const cloneBefore = group.cloneNode(true);
    cloneBefore.setAttribute('aria-hidden', 'true');
    group.parentNode.insertBefore(cloneBefore, group);
    
    // Clone after
    const cloneAfter = group.cloneNode(true);
    cloneAfter.setAttribute('aria-hidden', 'true');
    group.parentNode.appendChild(cloneAfter, group);
    
  });
});

// Custom Elements
class SkillCard extends HTMLElement {
  connectedCallback() {
    const skill = this.getAttribute('skill');
    const title = this.getAttribute('title');
    const progress = this.getAttribute('progress');
    const description = this.getAttribute('description');
    this.innerHTML = `
      <div class="skill-card ${skill} fade-in" role="group" aria-labelledby="${skill}-title">
        <div class="skill-card-header">
          <img class="lg-2" src="/assets/devicon/${skill}.webp" width="44" height="44" alt="">
          <h3 id="${skill}-title">${title}</h3>
        </div>
        <div class="progress-container">
          <div class="progress-bg"><div class="progress-bar" role="progressbar" aria-label="Learning Progress" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100" style="width: ${progress}%;"></div></div>
          <p aria-hidden="true">${progress}%</p>
        </div>
        <p>${description}</p>
      </div>
    `;
  }
}
customElements.define('skill-card', SkillCard);
