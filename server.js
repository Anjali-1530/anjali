const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const Contact = require("./models/Contact");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    database: mongoose.connection.readyState === 1 ? "connected" : "not connected"
  });
});

app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill in your name, email, and message."
      });
    }

    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: "The contact form is not connected to the database yet. Please configure MONGODB_URI in your .env file."
      });
    }

    const contact = new Contact({ name, email, message });
    await contact.save();

    return res.status(201).json({
      success: true,
      message: "Thank you! Your message has been saved successfully."
    });
  } catch (error) {
    console.error("Error saving contact:", error.message);
    return res.status(500).json({
      success: false,
      message: "Sorry, your message could not be sent. Please try again later."
    });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

async function startServer() {
  if (process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("MongoDB Connected Successfully");
    } catch (error) {
      console.error("MongoDB connection failed:", error.message);
      console.log("The website will still start, but the contact form needs MongoDB.");
    }
  } else {
    console.log("MONGODB_URI is not set. Website will start; contact form storage is disabled.");
  }

  app.listen(PORT, () => {
    console.log(`Portfolio running at http://localhost:${PORT}`);
  });
}

startServer();
