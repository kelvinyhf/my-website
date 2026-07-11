// Sleep functions
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const sleepR = (min, max) => new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * (max - min + 1)) + min));
