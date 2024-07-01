const router = require("express").Router();
const Meal = require("../models/Meal.model");
const mongoose = require('mongoose');


//Create meal
router.post("/create-meal", async (req, res) => {
  try {
    const { userId, ...mealData } = req.body; 
    const createdMeal = await Meal.create({ ...mealData, owner: userId }); 
    res.status(201).json(createdMeal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create meal" });
  }
});

//Get all meals
router.get("/all-meals", async (req, res) => {
  try {
    const allMeals = await Meal.find().populate('owner'); 
    res.status(200).json(allMeals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch all meals" });
  }
});

//Get all meals for a specific user
router.get('/your-meal/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { date } = req.query
    let query = { owner: userId };

    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(startDate.getDate() + 1);

      query.date = { $gte: startDate, $lt: endDate };
    }
    const userMeals = await Meal.find(query).populate('owner');
    console.log("Fetched meals:", userMeals);
    res.status(200).json(userMeals);
  } catch (error) {
    console.error("Error fetching user meals:", error);
    res.status(500).json({ message: "Failed to fetch user meals", error });
  }
});

// Get one meal
router.get("/one-meal/:mealId", async (req, res) => {
  try {
    const oneMeal = await Meal.findById(req.params.mealId);
    res.status(200).json(oneMeal);
  } catch (error) {
    console.log(error);
  }
});

// Update meal
router.patch("/update-meal/:mealId", async (req, res) => {
  try {
    const updatedMeal = await Meal.findByIdAndUpdate(
      req.params.mealId,
      req.body,
      { new: true }
    );
    res.status(201).json(updatedMeal);
  } catch (error) {
    console.log(error);
  }
});

// Delete meal
router.delete("/delete-meal/mealId", async (req, res) => {
    try {
        const deletedMeal = await Meal.findByIdAndDelete(req.params.mealId);
        res.status(200).json({message: "Meal removed successfully"});
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;
