const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
(async function() {
  const apiKey = require('dotenv').config({path: '.env.local'}).parsed.GEMINI_API_KEY;
  const ai = new GoogleGenerativeAI(apiKey);
  const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models?key=" + apiKey);
  console.log(await response.json());
})();
