const propertyService = require("../services/AgentAddPropertyService");

// POST create property
const AgentAddcreateProperty = async (req, res) => {
  try {
    const { category, furnished, bedrooms, bathrooms, area, price, title, description } = req.body;
    const images = req.files ? req.files.map(f => f.filename) : [];

    const property = await propertyService.AgentAddcreateProperty({
      category, furnished, bedrooms, bathrooms, area, price, title, description, images
    });

    res.status(201).json({ message: "Property created", property });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET all properties
const AgentAddgetAllProperties = async (req, res) => {
  try {
    const properties = await propertyService.AgentAddgetAllProperties();
    res.status(200).json(properties);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { AgentAddcreateProperty, AgentAddgetAllProperties };
