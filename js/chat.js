// Chat With Me
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const placeholders = [
  "How did you learn to code?",
  "What are your skills?",
  "What games do you play?",
  "How do you relax?",
  "What are your favorite foods?"
];
let chatHistory = [];

// Update placeholder
function updatePlaceholder() {
  const randomIndex = Math.floor(Math.random() * placeholders.length);
  userInput.placeholder = placeholders[randomIndex];
}

// Initial placeholder
updatePlaceholder()

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
  chatHistory.push({ role: "user", content: userText });
  
  // Append message of user
  appendMessage(userText, 'user');
  updatePlaceholder()
  userInput.value = '';
  
  // KelvinY is thinking...
  await sleepR(250, 750);
  appendMessage('KelvinY is thinking...', 'kelviny');
  
  try {
    
    // Send the prompt
    const response = await fetch('/chat-backend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ history: chatHistory }),
    });
    
    // Get the json
    const result = await response.json();
    
    // KelvinY is not thinking anymore
    if (chatMessages.lastChild.textContent === 'KelvinY is thinking...') {
      chatMessages.removeChild(chatMessages.lastChild);
    }
    
    // Check if there's an error
    if (result.error) {
      chatHistory.pop();
      appendMessage('Error (try): ' + result.error, 'kelviny');
      console.warn(result.error);
      return;
    }
    
    // Append message of AI
    const aiResponse = result.choices[0].message.content;
    appendMessage(aiResponse, 'kelviny');
    chatHistory.push({ role: "assistant", content: aiResponse });
    
    // Remove first conversation if there's more than 20 conversations
    while (chatHistory.length > 20) {
      chatHistory.shift();
      chatHistory.shift();
    }
    
  } catch (error) {
    
    // Delete the user message in the history
    chatHistory.pop();
    
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
