const express = require("express");
const router = express.Router();
const Lomba = require("../schema/lomba.js");

router.get("/", async (req, res) => {
  try {
    const lomba = await Lomba.find();
    res.json(lomba);
  } catch (e) {
    res.status(500).json({ message: "Server error", error: e.message });
  }
});

router.post("/", async (req, res) => {
  const { title, registrationDate, description, participants } = req.body;

  try {
    const newLomba = new Lomba({
      title,
      registrationDate,
      description,
      participants,
    });
    await newLomba.save();
    res.status(201).json(newLomba);
  } catch (e) {
    res.status(500).json({ message: "Server error", error: e.message });
  }
});

module.exports = router;
