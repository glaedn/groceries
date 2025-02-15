const mongoose = require("mongoose");

const GroceryItemSchema = new mongoose.Schema({
  name: String,
  isWeekly: { type: Boolean, default: false },
  isCrossedOff: { type: Boolean, default: false },
  isVisible: { type: Boolean, default: true } // New field
});

module.exports = mongoose.model("GroceryItem", GroceryItemSchema);
