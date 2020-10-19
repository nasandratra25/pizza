"use strict";

const mongoose = require('mongoose');

module.exports = async function() {
    mongoose.connect(process.env.DATABASE || 'mongodb://localhost:27017/pizzeria', {
        useUnifiedTopology: true, 
        useNewUrlParser: true    
    });

    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);
    return mongoose;
}
