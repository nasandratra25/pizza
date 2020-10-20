"use strict";

const mongooseLoader = require('../loaders/mongooseLoader');
const Order = require('../models/order');

const orders = [{
	pizzas: [{
		quantity : 2,
		size : "S",
		pizza : {
			_id: "5f7ed0a3c80494595c957843",
			name: "regina",
			price: 9.5
		}
	},
		{
			quantity: 1,
			size: "XL",
			pizza: {
				_id: "5f7ed0a3c80494595c957843",
				name: "regina",
				price: 9.5
			}
		}],
	customer: {
		_id: "5f7ed0be1dc13c5982a595a2",
		lastname: "Durand",
		address: "85, rue du parc privé",
		phone: "0728359641"
	},
	total: 25.5,
	cookingtime: 13.4,
	created : "2020-10-08T09:41:34.542Z",
	__v: 0
}]


async function seedOrders() {
	try {
		await mongooseLoader();
		for(let order of orders) {
			await Order.findOneAndUpdate({customer : order.customer},
				order, {new:true, upsert :true, setDefaultsOnInsert: true, runValidators:true});
		}
		console.log('Order added to database');

	} catch(err) {
		console.log(err)
	}
}


seedOrders();
