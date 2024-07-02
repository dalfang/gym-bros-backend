const router = require("express").Router();
const mongoose = require('mongoose');
const DataMeal = require("../models/DataMeal.model");

//Get data meals
router.get("/all-data-meals", async (req, res) => {
  try {
    const allDataMeals = await DataMeal.find(); 
    res.status(200).json(allDataMeals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch all meals" });
  }
});


// Get one data meal
router.get("/one-data-meal/:dataMealId", async (req, res) => {
  try {
    const oneDataMeal = await DataMeal.findById(req.params.dataMealId);
    res.status(200).json(oneDataMeal);
  } catch (error) {
    console.log(error);
  }
});

//Post data meal
router.post("/create-data-meal", async (req, res) => {
    try {
        const createDataMeal = await DataMeal.create(req.body);
        res.status(201).json(createDataMeal);
      } catch (error) {
        console.log(error);
      }
    });
      

module.exports = router;
