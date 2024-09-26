const mongoose = require("mongoose");
const { Schema, model } = mongoose;


const updateProgressSchema = new Schema({
  water: {
    type: Number,
    //required: true,
    // default: 0,
  },
  weight: {
    type: Number,
    //required: true,
    // default: 0,
  },
  workout: {
    type: Number,
    //required: true,
    // default: 0,
  },
  sleep: {
    type: Number,
    //required: true,
    // default: 0,
  },
  walk: {
    type: Number,
    //required: true,
    // default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
    // required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UpdateProgress = model("UpdateProgress", updateProgressSchema);

module.exports = UpdateProgress;
