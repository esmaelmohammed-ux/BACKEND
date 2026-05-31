import FoodModel from "../models/foodModel.js";
import fs from "fs";

export const addFood = async (req, res) => {
  console.log("=== ADD FOOD REQUEST ===");
  console.log("Request Body:", req.body);
  console.log("Request File:", req.file);

  try {
    const { name, price, description, category } = req.body;

    // Validation
    if (!name || !price || !category) {
      console.log("❌ Missing required fields");
      return res.status(400).json({
        success: false,
        message: "Name, price, and category are required",
      });
    }

    if (!req.file) {
      console.log("❌ No file uploaded");
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }

    // Create food object
    const foodData = {
      name: name,
      price: parseFloat(price),
      category: category,
      image: req.file.filename,
      description: description || "",
    };

    console.log("📝 Food data to save:", foodData);

    // Save to database
    const food = new FoodModel(foodData);
    const savedFood = await food.save();

    console.log("✅ Food saved to DB:", savedFood._id);

    res.status(201).json({
      success: true,
      message: "Food added successfully",
      data: savedFood,
    });
  } catch (error) {
    console.error("❌ Database Save Error:", error.message);
    console.error("❌ Full Error:", error);

    res.status(500).json({
      success: false,
      message: "Error adding food to database",
      error: error.message,
    });
  }
};

// all food list
export const listFood = async (req, res) => {
  try {
    const foods = await FoodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// remove food item
export const removeFood = async (req, res) => {
  try {
    const food = await FoodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});
    await FoodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
