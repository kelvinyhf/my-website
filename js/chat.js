// Chat With Me
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
let chatHistory = [];

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

// Resize textarea function
function resizeTextarea() {
  userInput.style.height = 'auto';
  userInput.style.height = userInput.scrollHeight + 'px';
}

// Initial size and event listener
resizeTextarea()
userInput.addEventListener('input', resizeTextarea);

// When sendbtn being clicked 
sendBtn.addEventListener('click', async function() {
  
  // If disabled or nothing is typed
  if (sendBtn.disabled || userInput.value === '' || userInput.value.trim() === '') { return; }
  sendBtn.disabled = true;
  
  // Store userInput
  const userText = userInput.value.trim();
  chatHistory.push({ role: "user", content: userText });
  
  // Append message of user
  appendMessage(userText, 'user');
  userInput.value = '';
  resizeTextarea();
  
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
      appendMessage(`Error (try): [${result.error}]`, 'kelvin');
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
    appendMessage(`Error (catch): [${error.message}]`, 'kelvin');
    console.error(error);
    
  } finally {
    
    // Cool it down
    await sleep(500);
    sendBtn.disabled = false;
    
  }
  
});

// When enter being pressed
userInput.addEventListener('keydown', function(event) {
  
  // Check if composing
  if (event.isComposing) return;
  
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
