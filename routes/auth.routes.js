const router = require("express").Router();
const UserModel = require("../models/User.model");
const RoutineModel = require("../models/Routine.model");
const MealModel = require("../models/Meal.model");
const ProgressModel = require("../models/Progress.model");
const UpdateProgressModel = require("../models/UpdateProgress.model.js")
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const uploader = require('../middleware/cloudinary.config.js');

router.post("/signup", uploader.single("imageUrl"), async (req, res) => {
  let userImage;
  if (req.file) {
    userImage = req.file.path;
  }

  try {
    const foundUser = await UserModel.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });
    if (foundUser) {
      return res.status(400).json({
        errorMessage: "Username or email already exists. Please choose another one.",
      });
    }

    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(req.body.password, salt);
    const createdUser = await UserModel.create({
      ...req.body,
      password: hashedPassword,
      userImage
    });
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({
      errorMessage: "An error occurred while creating the user.",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const foundUser = await UserModel.findOne({ email: req.body.email });
    if (foundUser) {
      const doesPasswordMatch = bcryptjs.compareSync(
        req.body.password,
        foundUser.password
      );
      if (doesPasswordMatch) {
        const loggedInUser = {
          _id: foundUser._id,
          username: foundUser.username,
          userImage: foundUser.userImage
        };
        const authToken = jwt.sign(
          loggedInUser,
          process.env.TOKEN_SECRET,
          { algorithm: "HS256", expiresIn: "6h" }
        );
        res
          .status(200)
          .json({ message: "Login successful", authToken: authToken });
      } else {
        res.status(500).json({
          errorMessage: "Invalid password",
        });
      }
    } else {
      res.status(500).json({
        errorMessage: "Invalid email",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.patch("/update-user/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(201).json(updatedUser);
  } catch (error) {
    console.log(error);
  }
});

//GET USER HERE
router.get("/profile", isAuthenticated, async (req, res) => {
  try {
    const currentUser = await UserModel.findById(req.payload._id);
    const currentRoutine = await RoutineModel.find({ owner: req.payload._id });
    const currentMeal = await MealModel.find({ owner: req.payload._id });
    const currentProgress = await ProgressModel.find({ owner: req.payload._id });
    const currentUpdateProgress = await UpdateProgressModelProgressModel.find({
      owner: req.payload._id,
    });
    console.log("current user", currentUser);
    console.log("current routine", currentRoutine);
    console.log("current meal", currentMeal);
    console.log("current progress", currentProgress);
    console.log("currentUpdateProgress", currentUpdateProgress);
    res.status(200).json({currentUser, currentRoutine, currentMeal, currentProgress, currentUpdateProgress});
  } catch (error) {
    console.log(error);
  }
});

router.get('/all-users', async (req, res) => {
  try {
    const allUsers = await UserModel.find();
    res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: 'An error occurred while fetching all users' });
  }
});


router.get("/verify", isAuthenticated, (req, res) => {
  console.log("made it to the verify route", req.payload);
  if (req.payload) {
    res.status(200).json({ message: "Token valid", user: req.payload });
  } else {
    res.status(401).json({ message: "Invalid headers" });
  }
});

module.exports = router;
