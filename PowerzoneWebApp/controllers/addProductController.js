// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `Product` from `../models/ProductModel.js`
const Product = require('../models/ProductModel.js');

// import module mongoose
const mongoose = require('mongoose');

// import module uniqid
const uniqid = require('uniqid');

const addProductController = {

    /**
     * This function displays the add product page following a get request from a user. This function also checks the role of the 
     * currently logged in user and directs them to the add product page if the appropriate role is used to access the page. 
     * This function restricts the access of users not logged in to an existing account as well.
     *
     * @param req the object containing the HTTP request to access the add product page
     * @param res the object to send back the appropriate HTTP response to either allow or reject user access to the add product page
     */
    getAddProduct: function (req, res) {

        // This conditional statement checks if the user is not an Administrator nor a Depot General Manager (i.e., unauthorized account)
        if(req.session.role != "Administrator" && req.session.role != "Depot General Manager") {
            
            /** 
             * This conditional statement checks if the user is logged in and does not have the authorized role to access the page.
             * In the event of unauthorized access, user will be logged out of the session and will be asked to log in with an
             * authorized account instead.
             */
            if(req.session.role == "Depot Supervisor" || req.session.role == "Depot Cashier" || req.session.role == "Regular User") {
                    var details = {error: `User is unauthorized to access the page. Please log in with an authorized account.`}

                    req.session.destroy(function(err) {
                        if(err) 
                            throw err;
                        else 
                            console.log('Logout Successful.');

                    });
            }
            // Loads an error message to ask the user to log in before trying to access any page of the website
            else
                var details = {error: `User is not logged in. Please log in first.`}

            // Re-loads the login page with the appropriate error message
            res.render('login', details);
        }
        // Displays the add product page if the logged-in account is authorized
        else
            res.render('addProduct');
    },

    /**
     * This function adds a new product to the database following a post request from an authorized user
     *
     * @param req the object containing the HTTP request to add a product with the received details in the HTML input fields
     * @param res the object to send back the appropriate HTTP response to display a success or fail page after the post request
     */
    postProduct: function(req, res) {

        // Obtains the necessary information from the post request and performs necessary operations needed for product details
        var productId = uniqid('product-');
    	var date = req.body.date_purchase;
    	var supp = req.body.supplier;
    	var qty = req.body.quantity;
    	var name = req.body.product;
    	var price = req.body.price_liter;
    	var location = req.body.stock_location;
        var withdrawalAmount = parseFloat(qty) * parseFloat(price);
        var dateArray = date.split('-');
        var newDate = dateArray[1] + '/' + dateArray[2] + '/' + dateArray[0];
        
        // creates a user object to add to the database based on the post request details
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

        // Adds the product and all indicated details to the database and redirects to the products page on success
        db.insertOne(Product, addedProduct, function(flag) {
            if(flag)
                res.redirect('/products');
            else
            	console.log('Error adding product to database.');
            
        });
    }
}


module.exports = addProductController;
