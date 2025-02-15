const express = require("express");
const GroceryItem = require("../models/GroceryItem");
const router = express.Router();

// Add item
router.post("/add", async (req, res) => {
  const newItem = new GroceryItem({ name: req.body.name });
  await newItem.save();
  res.json(newItem);
});

// Get all items
router.get("/", async (req, res) => {
  const items = await GroceryItem.find();
  res.json(items);
});

// Toggle weekly
router.put("/weekly/:id", async (req, res) => {
  const item = await GroceryItem.findById(req.params.id);
  item.isWeekly = !item.isWeekly;
  await item.save();
  res.json(item);
});

// Toggle crossed off
router.put("/cross/:id", async (req, res) => {
  const item = await GroceryItem.findById(req.params.id);
  item.isCrossedOff = !item.isCrossedOff;
  await item.save();
  res.json(item);
});

router.put("/clear-crossed", async (req, res) => {
    await GroceryItem.updateMany(
      { isCrossedOff: true },
      { $set: { isVisible: false, isCrossedOff: false } }
    );
    res.json({ message: "Crossed-off items hidden" });
  });
  

// Route to add weekly items back
router.put("/add-weekly", async (req, res) => {
    try {
      await GroceryItem.updateMany(
        { isWeekly: true },
        { isVisible: true }
      );
      res.json({ message: "Weekly items added back" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


// Delete item by ID
router.delete("/delete/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const item = await GroceryItem.findByIdAndDelete(id);
  
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
  
      res.status(200).json({ message: "Item deleted successfully", item });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
  

module.exports = router;
