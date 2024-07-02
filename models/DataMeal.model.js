const { Schema, model } = require('mongoose');

const DataMealSchema = new Schema({
    name: { 
        type: String, 
    },
    description: { type: String },
    calories: { type: Number },
    ingredients: [{ type: String }],
}, { timestamps: true });

const DataMeal = model("DataMeal", DataMealSchema);

module.exports = DataMeal;
