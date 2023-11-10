const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const axios = require("axios");
const userRoute = require("./Routes/userRoute");
const rateLimit = require("express-rate-limit");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoute);

let isProcessing = false; // Flag to track whether a request is in progress

const chatLimiter = rateLimit({
  windowMs: 60 * 1000, // Set to 1 minute
  max: 1,
  message: "Rate limit exceeded. Please try again later.",
});


app.post("/api/chat", chatLimiter, async (req, res) => {
  try {
    console.log("reached hre");
    // Check if a request is already in progress
    if (isProcessing) {
      return res.status(429).json({ error: "Request in progress. Please try again later." });
    }

    isProcessing = true; // Set the flag to indicate that a request is in progress

    const OpenAIApi = axios.create({
      baseURL: "https://api.openai.com/v1/",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    const { message } = req.body;

    const response = await OpenAIApi.post("completions", {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: message },
      ],
      max_tokens: 10
    });

    const chatbotResponse = response.data.choices[0].message.content;
    res.json({ response: chatbotResponse });
    // console.log(chatbotResponse);
    console.log("reached here");
  } catch (error) {
    console.log("OpenAI API error:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    isProcessing = false; // Reset the flag after the request is complete
  }
});

app.get("/", (req, res) => {
  res.send("Welcome to our chat API...");
});

const uri = process.env.ATLAS_URI;
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}...`);
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection established..."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));
