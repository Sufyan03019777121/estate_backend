const Agent = require("../models/UserAgentModel");

// Create new agent
const createAgent = async (data) => {
  const agent = new Agent(data);
  return await agent.save();
};

// Get all agents
const getAllAgents = async () => {
  return await Agent.find().sort({ createdAt: -1 });
};

// Update agent by ID
const updateAgent = async (id, data) => {
  return await Agent.findByIdAndUpdate(id, data, { new: true });
};

// Delete agent by ID
const deleteAgent = async (id) => {
  return await Agent.findByIdAndDelete(id);
};

// Change status (Verified / Blocked)
const changeAgentStatus = async (id, status) => {
  return await Agent.findByIdAndUpdate(id, { status }, { new: true });
};

module.exports = {
  createAgent,
  getAllAgents,
  updateAgent,
  deleteAgent,
  changeAgentStatus,
};
