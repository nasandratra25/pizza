"use strict";

const express = require('express');
let router = express.Router();
const Order = require('../models/order');
const Pizza = require('../models/pizza');
const Customer = require('../models/customer');



/* TODO : routes pour créer et accéder aux commandes */

/* TODO : créer commandes */
router.route('/commande').post(async (req, res) => {
    try {
        let sommeTotal = 0;
        let sommeQuantite = 0;
        let tempsPreparation = 0;
        let tempsCuisson = 3;
        let order = new Order();
        let coefCuisson = 1;
        const orderReq = req.body;
        const customer = await Customer.findOne({"_id": orderReq.customer});
        if (customer == null){
            console.log('customer non disponible ');
            return res.status(400).json({error: "customer non disponible"});
        }


        for (var i = 0; i < orderReq.pizzas.length; i++){

            let pizza = await Pizza.findOne({name: orderReq.pizzas[i].name});
            if (pizza == null){
                console.log('pizza non disponible ');
                return res.status(400).json({error: "pizza non disponible"});
            }
            let pizzas = {
                quantity: orderReq.pizzas[i].quantity,
                size: orderReq.pizzas[i].size,
                pizza: {
                    _id: pizza._id,
                    name: pizza.name,
                    price: pizza.price
                }
            };
            sommeTotal += (parseFloat(orderReq.pizzas[i].quantity) * parseFloat(pizza.price));
            sommeQuantite += parseFloat(orderReq.pizzas[i].quantity);
            order.pizzas.push(pizzas);
            const tempsSupplementaire = ((1 * 30)/100);

            if (orderReq.pizzas[i].size === 'S'){
                tempsPreparation += parseFloat(pizza.ingredients.length) * parseFloat(orderReq.pizzas[i].quantity);
            }
            else if (orderReq.pizzas[i].size === 'M'){
                tempsPreparation += ((parseFloat(pizza.ingredients.length) + ( parseFloat(pizza.ingredients.length) * parseFloat(tempsSupplementaire )))
                    *  parseFloat(orderReq.pizzas[i].quantity));
            }
            else {
                tempsPreparation += ((parseFloat(pizza.ingredients.length) + ( parseFloat(pizza.ingredients.length) * parseFloat((tempsSupplementaire * 2))))
                    *  parseFloat(orderReq.pizzas[i].quantity));
            }

        };

        if (sommeQuantite <= 4 ){
            let tempsCuissonAjouter = parseFloat((coefCuisson * tempsCuisson));
            order.__v = 0;
            order["cooking-time" ] = tempsCuissonAjouter + tempsPreparation;
            order.total = (parseFloat(sommeTotal));
            order.save();
            return res.status(200).json(order);
        }
        coefCuisson = parseInt((sommeQuantite / 4));
        let tempsCuissonAjouter = parseFloat((coefCuisson * tempsCuisson));
        order.__v = 0;
        order["cooking-time" ]= tempsCuissonAjouter + tempsPreparation;
        order.total = (parseFloat(sommeTotal));

        order.customer = {
            _id: customer._id,
            lastname: customer.lastname,
            address: customer.address,
            phone: customer.phone
        };
        order.save();
        return res.status(200).json(order);

    } catch (err) {
        console.log(err);
    }
});

/* TODO : accéder aux commandes */
router.route('/commande/:id').get(async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        return res.status(200).json(order);
    } catch (err) {
        console.log(err);
    }
});

router.route('/commande').get(async (req, res) => {
    try {
        const orderReq = req.body;
        if (orderReq.customer){
            const orders = await Order.find({"customer._id": orderReq.customer});
            return res.status(200).json(orders);
        }
        else if(orderReq.size){
            let orders = await Order.find({"pizzas.size": orderReq.size});
            return res.status(200).json(orders);
        }
        else if(orderReq["date-commande"]){
            let orders = await Order.find({"created": orderReq["date-commande"]});
            return res.status(200).json(orders);
        }
        else if(orderReq["prix-total"]){
            let orders = await Order.find({"total": orderReq["prix-total"]});
            return res.status(200).json(orders);
        }
        else if(orderReq["cuisson-estime"]){
            let orders = await Order.find({"cooking-time": orderReq["cuisson-estime"]});
            return res.status(200).json(orders);
        }
        const orders = await Order.find();
        return res.status(200).json(orders);
    } catch (err) {
        console.log(err);
    }
});

router.route('/commandes').get(async (req, res) => {
    try {
        const orders = await Order.find();
        return res.status(200).json(orders);
    } catch (err) {
        console.log(err);
    }
});

/* TODO : suivi  commandes */
router.route('/commande/suivi').post(async (req,res) => {

    try {
        const orderReq = req.body;
        await Order.findOneAndUpdate({ _id: orderReq.order },
            {
                $set: { "is-prepared": req.body["is-prepared"]}
            },
            {
                upsert: true
            }
        );
        const order = await Order.findById(orderReq.order);
        const orderSuivi = [{
            order: order._id,
            "is-prepared": order["is-prepared"]
        }];
        return res.status(200).json(orderSuivi);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
