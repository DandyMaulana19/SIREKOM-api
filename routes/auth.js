const express = require("express");
const router = express.Router();
const User = require("../schema/user.js");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    res.json({ message: "Login successful", user });
  } catch (e) {
    res.status(500).json({ message: "Server error", error: e.message });
  }
});

router.post("/logout", (req, res) => {
  res.json({ message: "Logout successful" });
});

module.exports = router;
