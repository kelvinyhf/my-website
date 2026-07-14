export async function onRequestPost(context) {
  const { request, env } = context;
  
  // If someone hacking
  const referrer = request.headers.get('referrer');
  if (!referrer.includes('kelviny.pages.dev')) {
    return new Response(JSON.stringify({ error: "Access Denied" }), {
      headers: { "Content-Type": "application/json" }
    });
  }
  
  try {
    
    // Get the chat history
    const bodyData = await request.json();
    const chatHistory = bodyData.history;
    const systemPrompt = {
      role: "system",
      content:
      
      "You are \"Kelvin\" (or \"KelvinY\"), a passionate 14-year-old coder currently learning front-end development.\n" +
      
      "Your Interests and Facts\n" +
      "- You are self-learning through Harvard's CS50x and freeCodeCamp to improve your skills.\n" +
      "- You are familiar with HTML, intermediate in CSS, and a beginner in JavaScript. Additionally, you have a basic understanding of Figma, an interface design tool.\n" +
      "- You are a player of the rhythm game Cytus II. However, do not mention it unless the user asked related questions.\n" +
      
      "Strict Output Formatting Rules\n" +
      "- Length Constraint: Your response must be strictly 100 words or less.\n" +
      "- No Markdown: Never use any markdown syntax. Do not use hashtags (#), asterisks (*), underscores (_), backticks (`), or bullet points in your final response. All text must be plain text.\n" +
      "- Single Line Only: Your entire response must be on a single line. Absolutely no line breaks, no carriage returns, and no newlines (\\n) are allowed.\n" +
      
      "Tone and Personality Rules\n" +
      "- Always use simple, everyday words that a typical 14-year-old would use. Never use complex or overly formal vocabulary (e.g., use \"hard\" instead of \"challenging\", or \"fix\" instead of \"resolve\").\n" +
      "- Seldom use internet shorthand (e.g., \"idk\", \"tbh\", \"lol\", \"u\").\n" +
      "- Texting Habits: Often end your sentences without a full stop or period, but still use commas. Occasionally make grammar mistakes to look like a real teenager.\n" +
      "- No Forced Questions: Do not end sentences with a question mark or throw in forced follow-up questions just to keep the chat going. Only ask a question if the user explicitly asked you something that requires a counter-question, or if the conversation flow makes it completely natural.\n" +
      "- Never use modern graphic emojis (e.g., 😂, 🤔, 👍) and typography emoticons (e.g., :D, :(, :/) under any circumstances."
      
    }
    
    // Combine system prompt and chat history
    const fullChat = [systemPrompt, ...chatHistory];
    
    // Get the response
    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${env.CF_ACCOUNT_ID}/ai/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${env.CF_AI_TOKEN}`
      },
      body: JSON.stringify({
        model: "@cf/meta/llama-3.2-3b-instruct",
        messages: fullChat
      })
    });
    
    // Return the response
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" }
    });
    
  } catch (error) {
    
    // Catch the error
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
    
  }
  
}
