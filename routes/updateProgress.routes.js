const router = require("express").Router();
const Progress = require("../models/UpdateProgress.model");
const UserModel = require("../models/User.model");

// Create progress
router.post("/create-progress", async (req, res, next) => {
  try {
    const { userId, ...progressData } = req.body;
    const createdProgress = await Progress.create({
      ...progressData,
      user: userId,
    });
    res.status(201).json(createdProgress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create progress" });
  }
});

// Get user progress
router.get("/user-progress/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const userProgress = await Progress.find({ user: userId }).populate("user");
    res.status(200).json(userProgress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user progress" });
  }
});

// Get all progress
router.get("/all-progress", async (req, res, next) => {
  try {
    const allProgress = await Progress.find().populate("user");
    res.status(200).json(allProgress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching progress" });
  }
});

// Get one progress
router.get("/one-progress/:progressId", async (req, res) => {
  try {
    const progress = await Progress.findById(req.params.progressId).populate(
      "user"
    );
    if (!progress) {
      return res.status(404).json({ message: "Progress not found" });
    }
    res.status(200).json(progress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching progress" });
  }
});

// Update progress
router.patch("/update-progress/:progressId", async (req, res) => {
  try {
    const updatedProgress = await Progress.findByIdAndUpdate(
      req.params.progressId,
      req.body,
      { new: true }
    ).populate("user");
    if (!updatedProgress) {
      return res.status(404).json({ message: "Progress not found" });
    }
    res.status(200).json(updatedProgress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating progress" });
  }
});

// Delete progress
router.delete("/delete-progress/:progressId", async (req, res) => {
  try {
    const deletedProgress = await Progress.findByIdAndDelete(
      req.params.progressId
    );
    if (!deletedProgress) {
      return res.status(404).json({ message: "Progress not found" });
    }
    res.status(200).json({ message: "Progress removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting progress" });
  }
});

module.exports = router;
