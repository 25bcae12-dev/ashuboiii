// server.js (Final Version)
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static assets (Frontend)
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// PostgreSQL Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Route to fetch portfolio data
app.get("/portfolio", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM portfolio LIMIT 1");
    res.json(result.rows[0] || {});
  } catch (err) {
    console.error("Portfolio Error:", err);
    res.status(500).json({});
  }
});

// Route to handle contact form submission
app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: "All fields required" });
    }

    const result = await pool.query(
      "INSERT INTO messages (name, email, message) VALUES ($1, $2, $3) RETURNING *",
      [name, email, message]
    );

    return res.status(200).json({
      success: true,
      message: "Message saved",
      data: result.rows[0]
    });

  } catch (err) {
    console.error("CONTACT ERROR:", err);
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});