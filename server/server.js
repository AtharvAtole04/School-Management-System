const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const authRoutes = require("./routes/authRoutes");
const noticeRoutes = require("./routes/noticeRoutes");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


app.use(
  "/api/performance",
  require("./routes/performanceRoutes")
);


// Routes
app.use("/api/students", studentRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/auth", authRoutes);
app.use(
  "/api/notices",
  require("./routes/noticeRoutes")
);

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.listen(process.env.PORT, () => {
  console.log("Server Started");
});