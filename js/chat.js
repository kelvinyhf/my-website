// Chat With Me
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
let chatHistory = [];

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
    sendBtn.disabled = false;
    return;
  }
  
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
      chatHistory.pop();
      appendMessage('Error (try): ' + result.error, 'kelvin');
      console.warn(result.error);
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
    appendMessage('Error (catch): ' + error, 'kelvin');
    console.error(error);
    
  }
  
  // Enable the send button
  await sleep(500);
  sendBtn.disabled = false;
  
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
