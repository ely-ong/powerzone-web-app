const db = require('../models/db.js');

const Product = require('../models/ProductModel.js');

const mongoose = require('mongoose');

const uniqid = require('uniqid');

const addProductController = {

    getAddProduct: function (req, res) {
        res.render('addProduct');
    },

    postProduct: function(req, res) {

        var productId = uniqid('product-');
    	var date = req.body.date_purchase;
    	var supp = req.body.supplier;
    	var qty = req.body.quantity;
    	var name = req.body.product;
    	var price = req.body.price_liter;
    	var location = req.body.stock_location;

    	var addedProduct = {
            product: name,
            quantity: qty,
            supplier: supp,
            price: price,
            location: location,
            date: date,
            productId: productId
        }

        db.insertOne(Product, addedProduct, function(flag) {
            if(flag) {
            	console.log('Product added successfully to database.')
                res.redirect('/products');
            }
            else{
            	console.log('Error adding product to database.');
            }
        });
    }
}


module.exports = addProductController;
