const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const OpenAI = require("openai"); // ✅ updated import

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chat", async (req, res) => {
  try {
    const messages = [{ role: "user", content: req.body.message }];
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch response from OpenAI" });
  }
});

app.post("/schedule", (req, res) => {
  const trip = req.body;
  const dataFile = path.join(__dirname, "trips.json");

  try {
    let trips = [];
    if (fs.existsSync(dataFile)) {
      const content = fs.readFileSync(dataFile, "utf8");
      if (content) {
        trips = JSON.parse(content);
      }
    }

    trips.push(trip);
    fs.writeFileSync(dataFile, JSON.stringify(trips, null, 2));
    res.json({ message: "Trip scheduled successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to schedule trip" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
