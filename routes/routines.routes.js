const router = require ("express").Router();
const Routine = require("../models/Routine.model");

router.post("/create-routine", async (req, res) => {
  try {
    const createdRoutine = await Routine.create(req.body);
    res.status(201).json(createdRoutine);
  } catch (error) {
    console.log(error);
  }
});

router.get("/all-routines", async (req, res) => {
  try {
    const allRoutines = await Routine.find();
    res.status(200).json(allRoutines);
  } catch (error) {
    console.log(error);
  }
});

router.patch("/update-routine/:routineId", async (req, res) => {
  try {
    const updatedRoutine = await Routine.findByIdAndUpdate(
      req.params.routineId,
      req.body,
      { new: true }
    );
    res.status(201).json(updatedRoutine);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/delete-routine/routineId", async (req, res) => {
    try {
        const deletedRoutine = await Routine.findByIdAndDelete(req.params.mealId);
        res.status(200).json({message: "Routine removed successfully"});
    } catch (error) {
        console.log(error);
    }
})



module.exports = router;