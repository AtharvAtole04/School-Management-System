const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());



// Routes
app.use("/api/students", studentRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.listen(process.env.PORT, () => {
  console.log("Server Started");
});