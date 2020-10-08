"use strict";

const mongooseLoader = require('../loaders/mongooseLoader');
const Customer = require('../models/customer');
const customers = [{
    firstname : "Anne",
    lastname : "Durand",
    address: "85, rue du parc privé",
    phone : "0728359641",
},{
    firstname : "Nadir",
    lastname : "Rafaa",
    address: "12, place du château d'eau",
    phone : "0556996318",
},{
    firstname : "Paul",
    lastname : "Champeil",
    address: "24, avenue des pruniers",
    phone : "0715366489",
}]


async function seedCustomers() {
    try {
        await mongooseLoader();
        for(let customer of customers) {
            await Customer.findOneAndUpdate({lastname : customer.lastname}, customer, {new:true, upsert :true, setDefaultsOnInsert: true, runValidators:true});
        }
        console.log('Customers added to database');

    } catch(err) {
        console.log(err)
    }
}


seedCustomers();