const UserAgent = require("../models/UserAgentModel");
const bcrypt = require("bcrypt");

// 🟢 Login Controller
exports.login = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    // 1️⃣ Find Agent
    const agent = await UserAgent.findOne({ Email });
    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }

    // 2️⃣ Check Password
    const isMatch = await bcrypt.compare(Password, agent.Password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // 3️⃣ Check Status
    if (agent.status === "Blocked") {
      return res.status(403).json({ message: "Your account is blocked" });
    }

    // 4️⃣ Success
    res.status(200).json({
      message: "Login successful",
      agent: {
        id: agent._id,
        Name: agent.Name,
        Email: agent.Email,
        status: agent.status,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
