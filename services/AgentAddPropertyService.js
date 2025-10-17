const AgentAddProperty = require("../models/AgentAddProperty");

const AgentAddcreateProperty = async (data) => {
  const property = new AgentAddProperty(data);
  return await property.save();
};

const AgentAddgetAllProperties = async () => {
  return await AgentAddProperty.find().sort({ createdAt: -1 });
};

module.exports = { AgentAddcreateProperty, AgentAddgetAllProperties };
