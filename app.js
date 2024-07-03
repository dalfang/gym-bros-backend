const express = require("express");
const app = express();

require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express


// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);


const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);
const mealsRoutes = require("./routes/meals.routes");
app.use("/meals", mealsRoutes);
const progressRoutes = require("./routes/progress.routes");
app.use("/progress", progressRoutes);
const updateProgressRoutes = require("./routes/updateProgress.routes");
app.use("/updateProgress", updateProgressRoutes);
const routinesRoutes = require("./routes/routines.routes");
app.use("/routines", routinesRoutes);
const workoutsRoutes = require("./routes/workouts.routes");
app.use("/workouts", workoutsRoutes);
const dataMealRoutes = require("./routes/data-meal.routes");
app.use("/data-meal", dataMealRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
