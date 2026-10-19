// Touch screen active style fix
document.addEventListener('touchstart', () => {}, { passive: true });

// ------------------------------
// Random Useless Facts
// ------------------------------
const factsBox = document.getElementById("facts-box");
const factLabel = document.getElementById("fact-label");
const rollBtn = document.getElementById("roll-btn");
const facts = [
  { content: "I'm Kelvin, not Kevin." },
  { content: "My birthday is July 19" },
  { content: `I'm a member of <a href='https://hackclub.com' target="_blank" class='text-red-11 hover:text-red-12 active:text-red-12'>Hack Club</a>!` },
  { content: `I'm an <a href='https://www.16personalities.com/intj-personality' target="_blank" class='text-purple-11 hover:text-purple-12 active:text-purple-12'>INTJ</a> :|` },
  { content: "You'll be lucky today :]" },
  { content: "This domain (kelviny.dev) costs $8 :v" },
  { content: "Only 5% of this website is made by AI" },
  { content: "Only 95% of this website is made by me" },
  { content: "( ? )" },
  {
    get content() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      return `It's ${hours}:${minutes} now!`;
    }
  },
  { content: "Why you're keep rolling >:(" }
];

rollBtn.addEventListener("click", () => {
  
  // Get unshown facts
  const unshownFacts = facts.filter(fact => !fact.shown);
  if (unshownFacts.length <= 1) {
    rollBtn.innerHTML = "You've viewed all :0";
    rollBtn.disabled = true;
  }

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
      messageSubmitBtn.innerHTML = "Sent! Ty :3";
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
