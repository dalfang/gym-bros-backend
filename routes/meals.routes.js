const router = require("express").Router();
const Meal = require("../models/Meal.model");

// Create meal
router.post("/create-meal", async (req, res, next) => {
  try {
    const { userId, ...mealData } = req.body;
    const createdMeal = await Meal.create({ ...mealData, owner: userId });
    res.status(201).json(createdMeal);
  } catch (error) {
    console.error(error);
    // Passes the error to the next error handler middleware
    next(error);
  }
});

// Get all meals
router.get("/all-meals", async (req, res, next) => {
  try {
    const allMeals = await Meal.find().populate('owner');
    res.status(200).json(allMeals);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Get all meals for a specific user
router.get('/your-meal/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { date } = req.query;
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
    next(error);
  }
});

// Get one meal
router.get("/one-meal/:mealId", async (req, res, next) => {
  try {
    const oneMeal = await Meal.findById(req.params.mealId);
    if (!oneMeal) {
      return res.status(404).json({ message: "Meal not found" });
    }
    res.status(200).json(oneMeal);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Update meal
router.patch("/update-meal/:mealId", async (req, res, next) => {
  try {
    const updatedMeal = await Meal.findByIdAndUpdate(req.params.mealId, req.body, { new: true });
    res.status(200).json(updatedMeal);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Delete meal
router.delete("/delete-meal/:mealId", async (req, res, next) => {
  try {
    const deletedMeal = await Meal.findByIdAndDelete(req.params.mealId);
    if (!deletedMeal) {
      return res.status(404).json({ message: "Meal not found" });
    }
    res.status(200).json({ message: "Meal removed successfully" });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
