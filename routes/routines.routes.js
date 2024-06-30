const router = require("express").Router();
const Routine = require("../models/Routine.model");
const mongoose = require('mongoose');


// Create routine
router.post("/create-routine", async (req, res) => {
  try {
    const { userId, ...routineData } = req.body; 
    const createdRoutine = await Routine.create({ ...routineData, owner: userId }); 
    res.status(201).json(createdRoutine);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create routine" });
  }
});

// Get all routines
router.get("/all-routines", async (req, res) => {
  try {
    const allRoutines = await Routine.find().populate('owner');
    res.status(200).json(allRoutines);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching routines" });
  }
});

// Get all routines for a specific user
router.get('/user-routine/:userId', async (req, res) => {
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
    const userRoutines = await Routine.find(query).populate('owner');
    console.log("Fetched routine:", userRoutines);
    res.status(200).json(userRoutines);
  } catch (error) {
    console.error("Error fetching user meals:", error);
    res.status(500).json({ message: 'Error fetching user routines', error });
  }
});


// Get one routine
router.get("/one-routine/:routineId", async (req, res) => {
  try {
    const oneRoutine = await Routine.findById(req.params.routineId).populate('owner');
    if (!oneRoutine) {
      return res.status(404).json({ message: "Routine not found" });
    }
    res.status(200).json(oneRoutine);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching routine" });
  }
});

// Update routine
router.patch("/update-routine/:routineId", async (req, res) => {
  try {
    const updatedRoutine = await Routine.findByIdAndUpdate(
      req.params.routineId,
      req.body,
      { new: true }
    ).populate('owner');
    if (!updatedRoutine) {
      return res.status(404).json({ message: "Routine not found" });
    }
    res.status(200).json(updatedRoutine);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating routine" });
  }
});

// Delete routine
router.delete("/delete-routine/:routineId", async (req, res) => {
  try {
    const deletedRoutine = await Routine.findByIdAndDelete(req.params.routineId);
    if (!deletedRoutine) {
      return res.status(404).json({ message: "Routine not found" });
    }
    res.status(200).json({ message: "Routine removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting routine" });
  }
});

module.exports = router;
