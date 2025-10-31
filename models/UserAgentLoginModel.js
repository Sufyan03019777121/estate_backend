const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserAgentLoginSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    Phone: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    status: { type: String, default: "Pending" } 
  },
  { timestamps: true }
);

// Password hashing
UserAgentLoginSchema.pre("save", async function(next) {
  if (!this.isModified("Password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.Password = await bcrypt.hash(this.Password, salt);
  next();
});

module.exports = mongoose.model("UserAgentLogin", UserAgentLoginSchema);
