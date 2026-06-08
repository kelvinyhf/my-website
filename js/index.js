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

// Chat With Me
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

// Create message div and p
function appendMessage(message, sender) {
  const messageDiv = document.createElement('div');
  const messageP = document.createElement('p');
  
  // Add proper classes and messages
  messageDiv.classList.add('message', sender);
  messageP.textContent = message;
  
  // Append children
  messageDiv.appendChild(messageP);
  chatMessages.appendChild(messageDiv);
  
  // Auto scroll
  chatMessages.scrollTop = chatMessages.scrollHeight;
  
}

// When sendbtn being clicked 
sendBtn.addEventListener('click', function() {
  const message = userInput.value.trim();
  
  // Return if nothing is typed
  if (message === '') return;
  
  // Append message for user 
  appendMessage(message, 'user');
  userInput.value = '';
  
  // Fake AI response
  setTimeout(function() { appendMessage('Got it!', 'decodr'); }, 1000);
  
});

// When Enter being pressed 
userInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    sendBtn.click();
    }
});
