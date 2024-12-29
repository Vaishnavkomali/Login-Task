const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Load Mock User Data
const loadUsers = () => JSON.parse(fs.readFileSync("users.json", "utf-8"));

// Routes
// Login API
app.post("/api/login", (req, res) => {
  const { username, email, password } = req.body;
  const users = loadUsers();

  const user = users.find(
    (u) => u.username === username && u.email === email && u.password === password
  );

  if (user) {
    res.status(200).json({
      message: "Login successful",
      token: "mockAuthToken123", // Mock token
      user,
    });
  } else {
    res.status(401).json({ message: "Invalid username, email, or password" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
