const express = require("express");
const router = express.Router();
const User = require("../schema/user.js");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (e) {
    res.status(500).json({ message: "Server error", error: e.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const users = await User.countDocuments();
    res.json(users);
  } catch (e) {
    res.status(500).json({ message: "Server error", error: e.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, email },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (e) {
    res.status(500).json({ message: "Server error", error: e.message });
  }
});

module.exports = router;
