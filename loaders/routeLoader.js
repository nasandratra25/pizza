"use strict";

const pizza = require('../routes/pizza');
const order = require('../routes/order');

module.exports = async function(app) {

    app.use('/',[pizza, order]);

    app.use('*', (req,res) => {
        console.log('no route match');
        return res.status(400).json('no route match')
    });

    return app;
}