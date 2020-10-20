"use strict";

//TODO : création de schema pour les commandes.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Pizza = require('../models/pizza');

const pizzaCustom = new Schema({
    name: String,
    price: Number
});

const customerCustom = new Schema({
    lastname: String,
    address: String,
    phone: String
});
const pizzasCustom = new Schema({
    quantity : Number,
    size : String,
    pizza : {type: pizzaCustom }
});


const OrderSchema = new Schema({
    pizzas : {type: [pizzasCustom]},
    customer : customerCustom,
    quantity : Number,
    size : String,
    total : Number,
    "cooking-time" : Number,
    created : {type: Date, default : Date.now}
});

module.exports = mongoose.model('order', OrderSchema);
