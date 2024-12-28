const mongoose = require("mongoose");

const lombaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  registrationDate: { type: Date, required: true },
  description: { type: String, required: true },
  participants: { type: Number, required: true },
});

module.exports = mongoose.model("lomba", lombaSchema);
