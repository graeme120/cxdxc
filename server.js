const express = require("express");
const axios = require("axios");
const path = require("path");
const cors = require("cors");

const OPENAI_API_URL =
  "https://api.openai.com/v1/engines/gpt-4.0-turbo/completions"; // Changed engine to gpt-4.0-turbo
const OPENAI_API_KEY = "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"; // Replace with your OpenAI API key

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // This will parse incoming json from requests
app.use(express.static(path.join(__dirname, "public")));

const PORT = 3000;

app.post("/get-gpt-response", async (req, res) => {
  const userInput = req.body.input;

  try {
    const gptResponse = await callOpenAI(userInput);
    res.json({ response: gptResponse });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to get response from GPT" });
  }
});

async function callOpenAI(userInput) {
  const headers = {
    Authorization: `Bearer ${OPENAI_API_KEY}`,
    "Content-Type": "application/json",
  };

  const data = {
    prompt: `${userInput}\nChatGPT:`,
    max_tokens: 150,
    temperature: 0.1,
    stop: ["\n"],
    frequency_penalty: 0,
    presence_penalty: 0,
  };

  try {
    const response = await axios.post(OPENAI_API_URL, data, { headers });

    // Log the raw response from OpenAI
    console.log("OpenAI API Response:", response.data);

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    throw error;
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
