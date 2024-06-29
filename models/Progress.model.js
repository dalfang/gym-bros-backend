const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const progressSchema = new Schema({
  date: { type: Date, required: true },
  routines: { type: Schema.ObjectId, ref: 'Routine' },
  meals: { type: Schema.ObjectId, ref: 'Meal' },
  owner: { type: Schema.ObjectId, ref: 'UserModel', required: true }
}, { timestamps: true });

const Progress = model("Progress", progressSchema);

module.exports = Progress;
