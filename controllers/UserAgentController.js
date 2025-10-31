const UserAgent = require("../models/UserAgentModel");

// ✅ Create (Add Agent)
exports.addAgent = async (req, res) => {
  try {
    const newAgent = new UserAgent(req.body);
    await newAgent.save();

    res.status(201).json({
      success: true,
      message: "Agent added successfully",
      data: newAgent,
    });
  } catch (error) {
    console.error("❌ Add Agent Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Read (Get All Agents)
exports.getAgents = async (req, res) => {
  try {
    const agents = await UserAgent.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: agents,
    });
  } catch (error) {
    console.error("❌ Get Agents Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Update (Edit Agent)
exports.editAgent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAgent = await UserAgent.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedAgent)
      return res
        .status(404)
        .json({ success: false, message: "Agent not found" });

    res.json({
      success: true,
      message: "Agent updated successfully",
      data: updatedAgent,
    });
  } catch (error) {
    console.error("❌ Edit Agent Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


// 🧩 Delete Agent
exports.deleteAgent = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await UserAgent.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Agent not found" });
    }
    res.json({ message: "Agent deleted successfully" });
  } catch (error) {
    console.error("❌ Delete error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// ✅ Verify Agent
exports.verifyAgent = async (req, res) => {
  try {
    const { id } = req.params;
    const agent = await UserAgent.findByIdAndUpdate(
      id,
      { status: "Verified" },
      { new: true }
    );

    if (!agent)
      return res
        .status(404)
        .json({ success: false, message: "Agent not found" });

    res.json({
      success: true,
      message: "Agent verified successfully",
      data: agent,
    });
  } catch (error) {
    console.error("❌ Verify Agent Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Block Agent
exports.blockAgent = async (req, res) => {
  try {
    const { id } = req.params;
    const agent = await UserAgent.findByIdAndUpdate(
      id,
      { status: "Blocked" },
      { new: true }
    );

    if (!agent)
      return res
        .status(404)
        .json({ success: false, message: "Agent not found" });

    res.json({
      success: true,
      message: "Agent blocked successfully",
      data: agent,
    });
  } catch (error) {
    console.error("❌ Block Agent Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
