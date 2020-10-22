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
        var sommeTotal = 0;
        var sommeQuantite = 0;
        var tempsPreparation = 0;
        var tempsCuisson = 3;
        let orders = new Order();
        const orderReq = req.body;
        const customer = await Customer.find({"_id": orderReq.customer});

        orders.customer = {
            _id: customer[0]._id,
            lastname: customer[0].lastname,
            address: customer[0].address,
            phone: customer[0].phone
        };

        for (var i = 0; i < orderReq.pizzas.length; i++){

            let pizza = await Pizza.find({name: orderReq.pizzas[i].name});
            let pizzas = {
                quantity: orderReq.pizzas[i].quantity,
                size: orderReq.pizzas[i].size,
                pizza: {
                    _id: pizza[0]._id,
                    name: orderReq.pizzas[i].name,
                    price: pizza[0].price
                }
            };
            sommeTotal += (parseFloat(orderReq.pizzas[i].quantity) * parseFloat(pizza[0].price));
            sommeQuantite += parseFloat(orderReq.pizzas[i].quantity);
            orders.pizzas.push(pizzas);
            const tempsSupplementaire = ((1 * 30)/100);

            if (orderReq.pizzas[i].size === 'S'){
                tempsPreparation += parseFloat(pizza[0].ingredients.length) * parseFloat(orderReq.pizzas[i].quantity);
            }
            else if (orderReq.pizzas[i].size === 'M'){
                tempsPreparation += ((parseFloat(pizza[0].ingredients.length) + ( parseFloat(pizza[0].ingredients.length) * parseFloat(tempsSupplementaire )))
                    *  parseFloat(orderReq.pizzas[i].quantity));
            }
            else {
                tempsPreparation += ((parseFloat(pizza[0].ingredients.length) + ( parseFloat(pizza[0].ingredients.length) * parseFloat((tempsSupplementaire * 2))))
                    *  parseFloat(orderReq.pizzas[i].quantity));
            }

        };

        var coefCuisson = 1;

        if (sommeQuantite <= 4 ){
            coefCuisson = 1;
            var tempsCuissonAjouter = parseFloat((coefCuisson * tempsCuisson));
            orders.__v = 0;
            orders["cooking-time" ] = tempsCuissonAjouter + tempsPreparation;
            orders.total = (parseFloat(sommeTotal));
            orders.save();
            return res.status(200).json(orders);
        }
        var coefCuisson = parseInt((sommeQuantite / 4));
        var tempsCuissonAjouter = parseFloat((coefCuisson * tempsCuisson));
        orders.__v = 0;
        orders["cooking-time" ]= tempsCuissonAjouter + tempsPreparation;
        orders.total = (parseFloat(sommeTotal));
        orders.save();
        return res.status(200).json(orders);

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
        if (orderReq.customer != null ){
            const orders = await Order.find({"customer._id": orderReq.customer});
            return res.status(200).json(orders);
        }
        else if(orderReq.size != null){
            let orders = await Order.find({"pizzas.size": orderReq.size});
            return res.status(200).json(orders);
        }
        else if(orderReq["date-commande"] != null){
            let orders = await Order.find({"created": orderReq["date-commande"]});
            return res.status(200).json(orders);
        }
        else if(orderReq["prix-total"] != null){
            let orders = await Order.find({"total": orderReq["prix-total"]});
            return res.status(200).json(orders);
        }
        else if(orderReq["cuisson-estime"] != null){
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
