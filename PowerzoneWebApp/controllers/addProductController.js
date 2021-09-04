const db = require('../models/db.js');

const Product = require('../models/ProductModel.js');

const mongoose = require('mongoose');

const uniqid = require('uniqid');

const addProductController = {

    getAddProduct: function (req, res) {
        if(req.session.role != "Administrator" && req.session.role != "Depot General Manager"){
            if(req.session.role == "Depot Supervisor" || 
                req.session.role == "Depot Cashier" ||
                req.session.role == "Regular User") {

                    var details = {error: `User is unauthorized to access the page. Please log in with an authorized account.`}
                    req.session.destroy(function(err){
                    if(err) throw err;
                    else console.log('Logout Successful.');

                });
            }
            else
                var details = {error: `User is not logged in. Please log in first.`}

            res.render('login', details);
        }
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
        var withdrawalAmount = parseFloat(qty) * parseFloat(price);

        var dateArray = date.split('-');
        console.log(dateArray);
        console.log(withdrawalAmount); 

        var newDate = dateArray[1] + '/' + dateArray[2] + '/' + dateArray[0];
        console.log(newDate); 
    	var addedProduct = {
            product: name,
            quantity: qty,
            supplier: supp,
            price: price,
            location: location,
            date: date,
            dateString: newDate,
            productId: productId,
            withdrawalAmount: withdrawalAmount
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
