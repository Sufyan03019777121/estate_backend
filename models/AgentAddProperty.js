const mongoose = require("mongoose");

const AgentAddPropertySchema = new mongoose.Schema({
  category: { type: String, required: true },
  furnished: { type: String, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  area: { type: Number, required: true },
  price: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String }], 
}, { timestamps: true });

module.exports = mongoose.model("AgentAddProperty", AgentAddPropertySchema);
