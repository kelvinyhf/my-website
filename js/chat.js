// Chat With Me
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
let isThinking = false;
let chatHistory = [];

// Sleep functions
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const sleepR = (min, max) => new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * (max - min + 1)) + min));

// Append message function
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

// Update status
const status = document.getElementById('status');
const maxEnergy = 5;
let energy = sessionStorage.getItem('energy') !== null ? parseInt(sessionStorage.getItem('energy')) : maxEnergy;
let counter = sessionStorage.getItem('counter') !== null ? parseInt(sessionStorage.getItem('counter')) : '0';

// Regenerate energy
for (let i = 0; i < counter; i++) {
  if (energy < 5) energy++; else break;
}
sessionStorage.setItem('counter', '0');

// Update status function
function updateStatus() {
  
  // Update energy in stroage
  sessionStorage.setItem('energy', energy);
  
  if (energy <= 0) {
    
    // Disable things
    status.textContent = 'Offline';
    document.documentElement.style.setProperty('--dot-color', 'var(--gray-9)');
    userInput.placeholder = 'Kelvin is gone for a while...';
    sendBtn.disabled = true;
    
  } else {
    
    // Enable things
    status.textContent = 'Online';
    document.documentElement.style.setProperty('--dot-color', 'var(--green-9)');
    userInput.placeholder = 'Ask me anything...';
    
    if (isThinking) {
      sendBtn.disabled = true;
    } else {
      sendBtn.disabled = false;
    }
    
  }
  
}

// Initial status
updateStatus()

// When sendbtn being clicked 
sendBtn.addEventListener('click', async function() {
  
  if (sendBtn.disabled || isThinking || energy <= 0) { return; }
  
  // Check if nothing is typed
  if (userInput.value === '' || userInput.value.trim() === '') { return; }
  
  // Energy -1
  isThinking = true;
  energy--; 
  updateStatus();
  
  // Store userInput
  const userText = userInput.value.trim();
  chatHistory.push({ role: "user", content: userText });
  
  // Append message of user
  appendMessage(userText, 'user');
  userInput.value = '';
  
  // Kelvin is thinking...
  await sleepR(250, 750);
  appendMessage('Kelvin is thinking...', 'kelvin');
  
  try {
    
    // Send the prompt
    const response = await fetch('/chat-backend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ history: chatHistory }),
    });
    
    // Get the json
    const result = await response.json();
    
    // Kelvin is not thinking anymore
    if (chatMessages.lastChild.textContent === 'Kelvin is thinking...') {
      chatMessages.removeChild(chatMessages.lastChild);
    }
    
    // Check if there's an error
    if (result.error) {
      
      // Pop the message, append and log the error
      chatHistory.pop();
      appendMessage('Something went wrong, please try again.', 'kelvin');
      console.warn(result.error);
      
      // Disable thinking and update status
      isThinking = false;
      updateStatus();
      return;
      
    }
    
    // Append message of AI
    const aiResponse = result.choices[0].message.content;
    appendMessage(aiResponse, 'kelvin');
    chatHistory.push({ role: "assistant", content: aiResponse });
    
    // Remove first conversation if there's more than 20 conversations
    while (chatHistory.length > 20) {
      chatHistory.shift();
      chatHistory.shift();
    }
    
  } catch (error) {
    
    // Delete the user message in the history
    chatHistory.pop();
    
    // Kelvin cannot think anymore
    if (chatMessages.lastChild.textContent === 'Kelvin is thinking...') {
      chatMessages.removeChild(chatMessages.lastChild);
    }
    
    // Append and log error
    appendMessage('Something went wrong, please try again.', 'kelvin');
    console.error(error);
    
  }
  
  // Disable thinking and update status
  await sleep(500);
  isThinking = false;
  updateStatus();
  
});

// When enter being pressed
userInput.addEventListener('keydown', function(event) {
  
  // Check if composing
  if (event.isComposing || event.keyCode === 229) return;
  
  if (event.key === 'Enter') {
    // If is touch device
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    } else {
      // If PC "Shift + Enter"
      if (event.shiftKey) {
        return;
      } else {
        event.preventDefault();
        sendBtn.click();
      }
    }
  }
  
});

// Energy +1
setInterval(() => {
  if (energy < maxEnergy) {
    energy++;
    updateStatus();
  }
}, 20000);
