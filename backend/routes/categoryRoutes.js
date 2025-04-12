const express = require("express");

const protect = require("../middleware/authMiddleware");
const Category = require("../models/Category");

const router = express.Router();

router.post("/", protect, async (req, res) => {
  try {
    const {
      categoryName,
      count,
      image,
    } = req.body;

    const category = new Category({
      categoryName,
      count,
      image,
    });

    const createdProduct = await category.save();
    console.log("created");
    res.status(201).json(createdProduct);
  } catch (error) {
    console.log(error);
    res.status(500).send("Servers Error");
  }
});

router.get("/", protect, async (req, res) => {
  try {
    const categories = await Category.find({});
    console.log(categories);
    res.status(200).json({ categories });
  } catch (error) {
    console.error(error);
  }
});

router.put("/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryName, image, count } = req.body;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    const updateData = {};
    if (categoryName) updateData.categoryName = categoryName.trim();
    if (count !== undefined) {
      if (isNaN(count) || count < 0) {
        return res
          .status(400)
          .json({ message: "Item count must be a non-negative number" });
      }
      updateData.count = parseInt(count);
    }
    if (image) updateData.image = image;
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
