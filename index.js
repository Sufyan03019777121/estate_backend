// backend/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Routes
const agentPropertyRoutes = require("./routes/AgentAddpropertyRoutes");
app.use("/api/agent-properties", agentPropertyRoutes);

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/listingsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
