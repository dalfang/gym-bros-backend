const { Schema, model } = require("mongoose");

const mealSchema = new Schema(
  {
    name: {
      type: String,
      enum: ["Breakfast", "Lunch", "Dinner", "Snack", "Other"],
      required: true,
    },
    description: { type: String },
    calories: { type: Number },
    owner: { type: Schema.ObjectId, ref: "UserModel" },
    ingredients: [{ type: String }],
    date: { type: Date, default: Date.now },
}, { timestamps: true });

const Meal = model("Meal", mealSchema);

module.exports = Meal;
