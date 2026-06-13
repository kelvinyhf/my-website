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
const placeholders = [
  "What's your favorite food?",
  "What game do you play?",
  "What's your hobby?",
  "What songs you listens to?",
  "Why you like coding?",
];

// Update placeholder
function updatePlaceholder() {
  const randomIndex = Math.floor(Math.random() * placeholders.length);
  userInput.placeholder = placeholders[randomIndex];
}

// Initial placeholder
updatePlaceholder();

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

// Sleep functions
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const sleepR = (min, max) => new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * (max - min + 1)) + min));

// When sendbtn being clicked 
sendBtn.addEventListener('click', async function() {
  
  // Check if button is disabled
  if (sendBtn.disabled) { return; }
  sendBtn.disabled = true;
  
  // Check if nothing or only spaces is typed
  if (userInput.value === '') {
    userInput.value = userInput.placeholder;
  }
  else if (userInput.value.trim() === '') {
    return;
  }
  
  // Store userInput
  const userText = userInput.value.trim();
  
  // Append message of user
  appendMessage(userText, 'user');
  updatePlaceholder()
  userInput.value = '';
  
  // KelvinY is thinking...
  await sleepR(250, 750);
  appendMessage('KelvinY is thinking...', 'kelviny');
  
  try {
    
    // Send the prompt
    const response = await fetch('https://my-web-ai.decodr.workers.dev', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: userText }),
    });
    
    // Get the json
    const result = await response.json();
    
    // KelvinY is not thinking anymore
    if (chatMessages.lastChild.textContent === 'KelvinY is thinking...') {
      chatMessages.removeChild(chatMessages.lastChild);
    }
    
    // Check if there's an error
    if (result.error) {
      appendMessage('Error (try): ' + result.error, 'kelviny');
      console.warn(result.error);
      return;
    }
    
    // Append message of AI
    const aiResponse = result.choices[0].message.content;
    appendMessage(aiResponse, 'kelviny');
    
  } catch (error) {
    
    // KelvinY cannot think anymore
    if (chatMessages.lastChild.textContent === 'KelvinY is thinking...') {
      chatMessages.removeChild(chatMessages.lastChild);
    }
    
    // Append and log error
    appendMessage('Error (catch): ' + error, 'kelviny');
    console.error(error);
    
  }
  
  // Enable the send button
  await sleep(500);
  sendBtn.disabled = false;
  
});

// When Enter being pressed
userInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    sendBtn.click();
  }
});
