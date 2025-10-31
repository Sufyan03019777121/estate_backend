const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
const app = express();

// =========================
// 🧩 Middleware
// =========================
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// =========================
// 📦 Routes
// =========================
const agentPropertyRoutes = require("./routes/AgentAddPropertyRoutes");
app.use("/api/agent-properties", agentPropertyRoutes);

const agentRoutes = require("./routes/UserAgentRoutes");
app.use("/api/user-agents", agentRoutes);

const authRoutes = require("./routes/AuthRoutes");
app.use("/api/auth", authRoutes);


// =========================
// 🧠 MongoDB Connection
// =========================
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/listingsDB";


mongoose
  .connect(MONGO_URI) // ⚡ Deprecated options removed
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err.message));

// =========================
// ⚠️ Global Error Handler
// =========================
app.use((err, req, res, next) => {
  console.error("💥 Server Error:", err.message);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

// =========================
// 🚀 Start Server
// =========================
app.listen(PORT, () => console.log(`🌐 Server running at: http://localhost:${PORT}`));
