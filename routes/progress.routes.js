const router = require ("express").Router();
const Progress = require("../models/Progress.model");

router.post("/create-progress", async (req, res) => {
  try {
    const createdProgress = await Progress.create(req.body);
    res.status(201).json(createdProgress);
  } catch (error) {
    console.log(error);
  }
});

router.get("/all-progress", async (req, res) => {
  try {
    const allProgress = await Progress.find();
    res.status(200).json(allProgress);
  } catch (error) {
    console.log(error);
  }
});

router.patch("/update-progress/:progressId", async (req, res) => {
  try {
    const updatedProgress = await Progress.findByIdAndUpdate(
      req.params.progressId,
      req.body,
      { new: true }
    );
    res.status(201).json(updatedProgress);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/delete-progress/progressId", async (req, res) => {
    try {
        const deletedProgress = await Meal.findByIdAndDelete(req.params.progressId);
        res.status(200).json({message: "Progress removed successfully"});
    } catch (error) {
        console.log(error);
    }
})



module.exports = router;