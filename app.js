const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000; 
// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express

const cors = require("cors");
app.use(cors({ origin: ["http://localhost:5173", "http://example.com"] }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
const routinesRoutes = require("./routes/routines.routes");
app.use("/routines", routinesRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
//require("./error-handling")(app);
const { errorHandler, notFoundHandler } = require("./error-handling/error-handling");
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });

module.exports = app;
