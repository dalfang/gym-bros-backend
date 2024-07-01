const router = require("express").Router();
const Workout = require("../models/Workout.model");

router.post("/create-workout", async (req, res) => {
  try {
    const createdWorkout = await Workout.create(req.body);
    res.status(201).json(createdWorkout);
  } catch (error) {
    console.log(error);
  }
});

router.get("/all-workouts", async (req, res) => {
  try {
    const allWorkouts = await Workout.find();
    res.status(200).json(allWorkouts);
  } catch (error) {
    console.log(error);
  }
});

router.get("/one-workout/:workoutId", async (req, res) => {
  try {
    const oneWorkout = await Workout.findById(req.params.workoutId);
    res.status(200).json(oneWorkout);
  } catch (error) {
    console.log(error);
  }
});

router.patch("/update-workout/:workoutId", async (req, res) => {
  try {
    const updatedWorkout = await Workout.findByIdAndUpdate(
      req.params.workoutId,
      req.body,
      { new: true }
    );
    res.status(201).json(updatedWorkout);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/delete-workout/workoutId", async (req, res) => {
  try {
    const deletedWorkout = awaitWorkout.findByIdAndDelete(req.params.workoutId);
    res.status(200).json({ message: "Workout removed successfully" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
