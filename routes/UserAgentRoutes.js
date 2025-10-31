const express = require("express");
const router = express.Router();
const {
  addAgent,
  getAgents,
  editAgent,
  removeAgent,
  deleteAgent,
  verifyAgent,
  blockAgent,
} = require("../controllers/UserAgentController");

// CRUD
router.post("/", addAgent);
router.get("/", getAgents);
router.put("/:id", editAgent);
router.delete("/:id", deleteAgent);

// Verify / Block
router.put("/verify/:id", verifyAgent);
router.put("/block/:id", blockAgent);

module.exports = router;
