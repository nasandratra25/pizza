"use strict";

const mongooseLoader = require('../loaders/mongooseLoader');
const Pizza = require('../models/pizza');
const pizzas = [{
    name : "margarita",
    ingredients : ["fromage", "sauce tomate"],
    description : "La pizza classique, un incontournable",
    price : 8
},{
    name : "régina",
    ingredients : ["fromage", "sauce tomate", "jambon", "olives"],
    description : "savoureuse et croustillante",
    price : 9.50
},{
    name : "chicken",
    ingredients : ["fromage", "sauce tomate", "poulet", "olives"],
    description : "une variante des plus recommandées par nos clients",
    price: 9.50
}]


async function seedPizzas() {
    try {
        await mongooseLoader();
        for(let pizza of pizzas) {
            await Pizza.findOneAndUpdate({name : pizza.name}, pizza, {new:true, upsert :true, setDefaultsOnInsert: true, runValidators:true});
        }
        console.log('Pizzas added to database');

    } catch(err) {
        console.log(err)
    }
}


seedPizzas();