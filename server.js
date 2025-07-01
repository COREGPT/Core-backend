const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Use Render environment variable
});
const openai = new OpenAIApi(configuration);

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are CORE, an intelligent and helpful AI assistant." },
        { role: "user", content: userMessage },
      ],
    });
    res.json({ reply: completion.data.choices[0].message.content });
  } catch (error) {
    console.error("Error from OpenAI API:", error);
    res.json({ reply: "Oops! Something went wrong." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`CORE backend is running on port ${PORT}`));