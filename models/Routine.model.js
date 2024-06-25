const { Schema, model } = require('mongoose');

const routineSchema = new Schema({
    name: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    workout: { type: String, required: true },
    bodyPart: { type: String, required: true },
    totalDuration: {type: Number}
  }, { timestamps: true });
  
const Routine = model("Routine", routineSchema);

module.exports = Routine;
