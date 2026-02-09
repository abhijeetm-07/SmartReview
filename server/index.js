const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const authRoutes = require("./routes/authRoutes.js");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => {
    console.log(`error in connecting${err}`);
  });
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
