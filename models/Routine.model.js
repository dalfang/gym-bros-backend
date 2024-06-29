const { Schema, model } = require('mongoose');

const routineSchema = new Schema({
    name: { type: String, required: true },
    owner: { type: Schema.ObjectId, ref: 'UserModel'},
    workout: { type: String, required: true },
    bodyPart: { type: String},
    totalDuration: {type: Number}
  }, { timestamps: true });
  
const Routine = model("Routine", routineSchema);

module.exports = Routine;