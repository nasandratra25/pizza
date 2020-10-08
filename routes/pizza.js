"use strict"

const express = require('express');
let  router = express.Router();
const Pizza = require('../models/pizza');


/* fichier pour les routes relatives aux pizzas*/

router.route('/pizza').post(async (req, res) => {
    try {
        let pizza = new Pizza(req.body);
        pizza = await pizza.save();
        return res.status(200).json(pizza);
    } catch (err) {
        console.log(err);
    }
});

router.route('/pizza/:id').get(async (req, res) => {
    try {
      const pizza = await Pizza.findById(req.params.id);
      return res.status(200).json(pizza);  
    } catch (err) {
        console.log(err);
    }
});

router.route('/pizzas').get(async (req, res) => {
    try {
        const pizzas = await Pizza.find();
        return res.status(200).json(pizzas);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;