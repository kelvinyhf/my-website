// Touch screen active style fix
document.addEventListener('touchstart', () => {}, { passive: true });

// ------------------------------
// Random Facts
// ------------------------------
const factsBox = document.getElementById("facts-box");
const factLabel = document.getElementById("fact-label");
const rollBtn = document.getElementById("roll-btn");
const facts = [
  { content: "I'm Kelvin, not Kevin." },
  { content: "My birthday is July 19" },
  { content: "I love playing rhythm games" },
  { content: "I'm an INTJ :|" },
  { content: "You'll be lucky today!" },
  { content: "This domain (kelviny.dev) costs $8 :v" },
  { content: "Only 5% of this website is made by AI" },
  { content: "Only 95% of this website is made by me" },
  { content: "<img src='./assets/images/flork.jpeg' class='mx-auto w-15 h-15'>" },
  { content: "Why do you keep rolling >:(" },
  { content: "( ? )" },
  {
    get content() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      return `It's ${hours}:${minutes}!`;
    }
  }
];

rollBtn.addEventListener("click", () => {
  
  // Get unshown facts
  const unshownFacts = facts.filter(fact => !fact.shown);
  if (unshownFacts.length <= 1) rollBtn.disabled = true;

  // Get random fact
  const randomIndex = Math.floor(Math.random() * unshownFacts.length);
  const randomFact = unshownFacts[randomIndex];

  // Show the fact
  factLabel.innerHTML = randomFact.content;
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
  messageSubmitBtn.innerHTML = "Sending...";
  
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
      messageSubmitBtn.innerHTML = "Sent!";
      messageForm.reset();
    } else {
      messageSubmitBtn.innerHTML = "Something went wrong :(";
    }
    
  } catch (error) {
    messageSubmitBtn.innerHTML = "Something went wrong :(";
  } finally {
    setTimeout(() => {
      messageSubmitBtn.innerHTML = "Send Message";
      messageSubmitBtn.disabled = true;
    }, 2000);
  }
  
});
