var mongoose = require('mongoose');

// defines the schema for collection `personnel`
var ProductSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    supplier:{
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    product: {
        type: String,
        required: true
    }
});

/*
*    Exports a mongoose.model object based on `PersonnelSchema`when another script exports from this file
*    This model executes CRUD operations to collection `personnel`
*/
module.exports = mongoose.model('product', ProductSchema);
