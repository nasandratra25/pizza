"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PizzaSchema = new Schema({
    name : {type: String, unique: true, required:true},
    ingredients: {type: [String], required: true},
    description : String,
    price : Number
});

module.exports = mongoose.model('pizza', PizzaSchema);