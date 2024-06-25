const router = require("express").Router();
const Meal = require("../models/Meal.model");

router.post("/create-meal", async (req, res) => {
  try {
    const createdMeal = await Meal.create(req.body);
    res.status(201).json(createdMeal);
  } catch (error) {
    console.log(error);
  }
});

router.get("/all-meals", async (req, res) => {
  try {
    const allMeals = await Meal.find();
    res.status(200).json(allMeals);
  } catch (error) {
    console.log(error);
  }
});

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

router.delete("/delete-meal/mealId", async (req, res) => {
    try {
        const deletedMeal = await Meal.findByIdAndDelete(req.params.mealId);
        res.status(200).json({message: "Meal removed successfully"});
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;
