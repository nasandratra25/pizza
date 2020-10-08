"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    firstname : {type: String, required:true},
    lastname : {type: String, required: true},
    address: {type: String, required: true},
    phone : {type: String, required: true},
    created : {type: Date, default : Date.now}
});

module.exports = mongoose.model('customer', CustomerSchema);