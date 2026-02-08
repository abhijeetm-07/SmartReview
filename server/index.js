const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => {
    console.log(`error in connecting${err}`);
  });
const PORT = process.env.PORT || 5000;
// console.log("Value of URI:", process.env.MONGO_URI);
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
