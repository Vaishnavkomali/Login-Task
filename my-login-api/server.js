const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path"); // Import path module

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000", // Local frontend
      "https://vaishnav-login-task.netlify.app", // Your Netlify domain
    ],
  })
);

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

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "public"))); // Replace "public" with your build folder if needed

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html")); // React app's entry point
  });
}

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
