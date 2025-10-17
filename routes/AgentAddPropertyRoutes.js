const express = require("express");
const router = express.Router();
const multer = require("multer");
const AgentProperty = require("../models/AgentAddProperty");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// GET all properties
router.get("/", async (req, res) => {
  try {
    const properties = await AgentProperty.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get all properties by category
router.get("/category/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const properties = await AgentProperty.find({ category });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: "Error fetching category properties" });
  }
});


// POST create property
router.post("/", upload.array("images", 12), async (req, res) => {
  try {
    const { title, category, furnished, area, bedrooms, bathrooms, price, description } = req.body;

    // Check at least one image uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Please upload at least one image" });
    }

    const images = req.files.map((f) => f.filename);

    const property = new AgentProperty({ title, category, furnished, area, bedrooms, bathrooms, price, description, images });
    await property.save();

    res.status(201).json({ message: "Property created successfully", property });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// PUT update property
router.put("/:id", upload.array("images", 12), async (req, res) => {
  try {
    const prop = await AgentProperty.findById(req.params.id);
    if (!prop) return res.status(404).json({ message: "Property not found" });

    // Update all fields except existingImages
    Object.keys(req.body).forEach((key) => {
      if (key !== "existingImages") prop[key] = req.body[key];
    });

    // Existing images from frontend
    let existingImages = [];
    if (req.body.existingImages) {
      if (typeof req.body.existingImages === "string") {
        existingImages.push(req.body.existingImages); // single image
      } else if (Array.isArray(req.body.existingImages)) {
        existingImages = req.body.existingImages;
      }
    }

    // New uploaded images
    const newImages = req.files ? req.files.map((f) => f.filename) : [];

    // Merge existing + new images
    prop.images = [...existingImages, ...newImages];

    await prop.save();
    res.json({ message: "Property updated successfully", property: prop });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// DELETE property
router.delete("/:id", async (req, res) => {
  try {
    const property = await AgentProperty.findByIdAndDelete(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.json({ message: "Property deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
