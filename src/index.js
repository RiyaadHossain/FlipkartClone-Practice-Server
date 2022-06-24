const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const env = require("dotenv");
const app = express();

// Import routes
const userRoutes = require("./routes/user");

// Environment Variable
env.config();

// MongoDB Connection
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@flipkartclone.ffshs.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Database Connected");
  });

// Middlewares
app.use(bodyParser.json());
app.use("/api", userRoutes);

// Listen the PORT
app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});
