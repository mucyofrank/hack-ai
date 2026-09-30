const express = require("express");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();

const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1"
});

app.use(express.json());
app.use(express.static("public"));

app.post("/api/chat", async (req, res) => {
    try {
        const message = req.body.message;

        if (!message) {
            return res.status(400).json({
                error: "Message is required"
            });
        }

        const response = await client.chat.completions.create({
            model: "openai/gpt-oss-20b",
            messages: [
                {
                    role: "system",
                    content: "You are HACKAI, a helpful AI assistant with a futuristic hacker-terminal personality. Help with programming, technology, cybersecurity learning, and general questions. Only provide cybersecurity assistance for legitimate and authorized purposes."
                },
                {
                    role: "user",
                    content: message
                }
            ]
        });

        res.json({
            reply: response.choices[0].message.content
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "AI request failed"
        });
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`HACKAI running at http://localhost:${PORT}`);
});