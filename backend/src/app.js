const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const cookieParser = require("cookie-parser");

const app = express();

// ✅ CORS configuration (credentials + exact origin)
app.use(
  cors({
    origin: "http://localhost:5173", // frontend origin
    credentials: true
  })
);

app.use(express.json());
app.use(cookieParser());

// Health check
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Centralized routes
app.use("/api", routes);

module.exports = app;
