const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const workoutSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["strength", "cardio"], 
    required: true,
  },
  muscle: {
    type: String,
    required: true,
  },
  equipment: {
    type: String,
    // required: true,
  },
  difficulty: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"], 
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  image: {
    type: String, 
    // required: true,
  },
});

const Workout = model("Workout", workoutSchema);

module.exports = Workout;