const { Schema, model } = require('mongoose');

const mealSchema = new Schema({
    mealName: { 
        type: String, 
        enum: ["Breakfast", "Lunch", "Dinner", "Snack", "Other"]
    },
    description: { type: String },
    calories: { type: Number },
    ingredients: [{ type: String }],
    //user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const Meal = model("Meal", mealSchema);

module.exports = Meal;