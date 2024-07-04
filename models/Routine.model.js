const { Schema, model } = require('mongoose');

const routineSchema = new Schema({
  name: { type: String, required: true },
  owner: { type: Schema.ObjectId, ref: 'UserModel' },
  workout: { type: String, required: true },
  bodyPart: { type: String },
  totalDuration: { type: Number },
  date: { type: Date, required: true },
  imageUrl: { type: String }, 
}, { timestamps: true });

const Routine = model("Routine", routineSchema);

module.exports = Routine;
