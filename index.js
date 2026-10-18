// ------------------------------
// Random Useless Facts
// ------------------------------
const factsBox = document.getElementById("facts-box");
const factLabel = document.getElementById("fact-label");
const rollBtn = document.getElementById("roll-btn");
const facts = [
  { content: "I'm Kelvin", shown: false },
  { content: "I'm not Bob", shown: false }
];

rollBtn.addEventListener("click", () => {
  
  // Get unshown facts
  const unshownFacts = facts.filter(fact => !fact.shown);
  if (unshownFacts.length <= 0) {
    facts.forEach(fact => fact.shown = false);
    unshownFacts = facts;
  }

  // Get random fact
  const randomIndex = Math.floor(Math.random() * unshownFacts.length);
  const randomFact = unshownFacts[randomIndex];

  // Show the fact
  factLabel.innerText = randomFact.content;
  randomFact.shown = true;

  // Make the box jumps
  factsBox.animate([
    { transform: "translateY(10px)", offset: 0 },
    { transform: "translateY(0)", offset: 1 }
  ], {
    duration: 500,
    easing: "ease-out"
  });

});

// ------------------------------
// Leave a Message
// ------------------------------
const messageForm = document.getElementById("message-form");
const messageTextarea = document.getElementById("message-textarea");
const messageSubmitBtn = document.getElementById("message-submit-btn");
let clickedSubmit = false;

messageForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  
  // Check if clicked submit or typed nothing
  if (clickedSubmit) return;
  if (messageTextarea.value === "") return;
  clickedSubmit = true;
  
  // Show sending text
  messageSubmitBtn.innerText = "Sending...";
  
  // Get form data
  const data = new FormData(event.target);
  try {
    
    // Send the message
    const response = await fetch(event.target.action, {
      method: messageForm.method,
      body: data,
      headers: { "Accept": "application/json" }
    });
    
    // Show success text and reset form if succeed
    if (response.ok) {
      messageSubmitBtn.innerText = "Sent! Ty :3";
      messageForm.reset();
    } else {
      messageSubmitBtn.innerText = "Something went wrong :(";
    }
    
  } catch (error) {
    messageSubmitBtn.innerText = "Something went wrong :(";
  } finally {
    setTimeout(() => {
      messageSubmitBtn.innerText = "Send Message";
      messageSubmitBtn.disabled = true;
    }, 2000);
  }
  
});
