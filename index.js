// Random Useless Facts
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
