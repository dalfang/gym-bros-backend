const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const progressSchema = new Schema({
  date: { type: Date, required: true },
  routines: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Routine' }],
  meals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meal' }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const Progress = model("Progress", progressSchema);

module.exports = Progress;
