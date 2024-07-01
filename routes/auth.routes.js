const router = require("express").Router();
const UserModel = require("../models/User.model");
const RoutineModel = require("../models/Routine.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const uploader = require('../middleware/cloudinary.config.js');

router.post("/signup", uploader.single("imageUrl"), async (req, res) => {
  let userImage;
  if (req.file) {
    userImage = req.file.path;
  }
  console.log("here is the file from cloudinary", req.file);

  try {
    const foundUser = await UserModel.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });
    if (foundUser) {
      res.status(500).json({
        errorMessage: "Please pick unique username and email",
      });
    } else {
      const salt = bcryptjs.genSaltSync(10);
      const hashedPassword = bcryptjs.hashSync(req.body.password, salt);
      const createdUser = await UserModel.create({
        ...req.body,
        password: hashedPassword,
        userImage
      });
      console.log("User created", createdUser);
      res.status(201).json(createdUser);
    }
  } catch (error) {
    console.log(error);
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
    console.log("current user", currentUser);
    console.log("current routine", currentRoutine);
    res.status(200).json({currentUser, currentRoutine});
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
