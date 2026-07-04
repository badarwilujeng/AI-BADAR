const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function test() {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    console.error("GOOGLE_API_KEY is not set in .env");
    return;
  }
  
  console.log("Testing with API Key ending in:", apiKey.substring(apiKey.length - 4));
  
  const genAI = new GoogleGenerativeAI(apiKey);
  
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Say hello");
    console.log("Success with gemini-1.5-flash:");
    console.log(result.response.text());
  } catch (e) {
    console.error("Failed with gemini-1.5-flash:", e.message);
    if (e.response) {
       console.error("Status:", e.response.status);
    }
  }

  try {
    const listModels = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await listModels.json();
    console.log("Available models (first 5):");
    if (data.models) {
      data.models.slice(0, 5).forEach(m => console.log("- " + m.name));
    } else {
      console.log("No models returned:", data);
    }
  } catch (e) {
    console.error("Failed to list models:", e.message);
  }
}

test();
