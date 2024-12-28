const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/users.js");
const lombaRoutes = require("./routes/lomba.js");

const app = express();

app.use(bodyParser.json());
app.use(cors());
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((e) => console.error("MongoDB connection error:", e));

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/lomba", lombaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
