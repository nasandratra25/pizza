"use strict";

const morgan = require('morgan');
const bodyParser = require('body-parser');

module.exports = async function(app) {
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({extended : true}));
    app.use(bodyParser.json());



    return app;
}