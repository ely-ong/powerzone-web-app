// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `Product` from `../models/ProductModel.js`
const Transaction = require('../models/TransactionModel.js');

// import module `Product` from `../models/ProductModel.js`
const Product = require('../models/ProductModel.js');

// import module mongoose
const mongoose = require('mongoose');

// import module uniqid
const uniqid = require('uniqid');

const transactionsController = {

    /**
     * This is a helper function to load the a transaction's details from the database as values for the fields in the 
     * view transaction page.
     *
     * @param req the object containing the HTTP request to find the product being edited and all its details from the database
     * @param res the object to send back the appropriate HTTP response containing the details of the product being edited
     */
    findTransaction: function (req, res) {

        // Obtains the unique id of the product from the get request
        var uniqueId = req.query.transactionId;

        // Finds the product from the database using the unique id
        db.findOne(Transaction, {transactionId: transactionId}, '', function (result) {
            if(result) {
                res.send(result);
            }
            // Loads the error page if the product cannot be found in the database
            else
                res.render('error');
        });
    },

    /**
     * This is a helper function to check for all the total inventory of each product for sale.
     *
     * @param req the object containing the HTTP request to find the product being edited and all its details from the database
     * @param res the object to send back the appropriate HTTP response containing the details of the product being edited
     */
    getTotalInventory: function (req, res) {

        // Obtain transaction values from input field
        var quantity = req.query.quantity;
        var product = req.query.product; 

         // Submits a query to the database to return the list of all recorded products
        db.findMany(Product, {}, '', function (result) {
            if(result) {

                // Variable Instantiation
                var productsArray = result;
                var dieselTotal = 0;
                var gasolineTotal = 0;
                var premium95Total = 0;
                var premium97Total = 0;
                var keroseneTotal = 0;
                var isExceeded = false;

                // Performs necessary data manipulation
                for(var i = 0; i < productsArray.length; i++) {

                    if(productsArray[i].product == 'Diesel')
                        dieselTotal += parseFloat(result[i].quantity);
                    
                    else if(productsArray[i].product == 'Gasoline')
                        gasolineTotal += parseFloat(result[i].quantity);
                    
                    else if(productsArray[i].product == 'Premium Gasoline 95')
                        premium95Total += parseFloat(result[i].quantity);
                    
                    else if(productsArray[i].product == 'Premium Gasoline 97')
                        premium97Total += parseFloat(result[i].quantity);
                    
                    else if(productsArray[i].product == 'Kerosene')
                        keroseneTotal += parseFloat(result[i].quantity); 
                }

                if(product == 'Diesel' && quantity > dieselTotal){
                    isExceeded = true;
                }
                else if(product == 'Gasoline' && quantity > gasolineTotal){
                    isExceeded = true;
                }
                else if(product == 'Premium Gasoline 95' && quantity > premium95Total){
                    isExceeded = true;
                }
                else if(product == 'Premium Gasoline 97' && quantity > premium97Total){
                    isExceeded = true;
                }
                else if(product == 'Kerosene' && quantity > keroseneTotal){
                    isExceeded = true;
                }

                res.send(isExceeded);
            }
        });
    },

    /**
     * This function displays the transactions page from latest transaction to first transaction  following a get request from a user. 
     * This function also checks if the user is currently logged in and directs them to the home page once verified. 
     *
     * @param req the object containing the HTTP request to access the products page
     * @param res the object to send back the appropriate HTTP response to either allow or reject user access to the products page
     */
    getTransactions: function (req, res) {

        // Deny access to the user if they are not logged in to a valid account
    	if(req.session.role != "Administrator" && req.session.role != "Depot Supervisor" && req.session.role != "Depot Cashier" && 
            req.session.role != "Regular User" && req.session.role != "Depot General Manager") {

	        var details = {error: `User is not logged in. Please log in first.`}

            res.render('login', details);
        }

        // Initialize the variables
    	var transactionsArray = [];

        // Submits a query to the database to return the list of all recorded transactions
    	db.findMany(Transaction, {}, '', function (result) {
		    if(result) {
		    	transactionsArray = result;

                // Loads the product page with the sorted list of products in accordance with the sorting criteria
		        res.render('transactions', {u: {
		        	transactionsArray: transactionsArray
		        }});
		    }
		});
    },

    /**
     * This function displays more info on specific transaction following a get request from a user. 
     *
     * @param req the object containing the HTTP request to access the products page
     * @param res the object to send back the appropriate HTTP response to either allow or reject user access to the products page
     */
    viewTransaction: function (req, res) {

        // Initialize the variables
        var transactionId = req.query.redirect_button;

        // // Submits a query to the database to return the list of all recorded transactions
        db.findOne(Transaction, {transactionId: transactionId}, '', function (result) {
            if(result) {

                console.log(result);
                var totalAmountFixed = result.totalAmount.toFixed(2);
                result.totalAmount = totalAmountFixed;

                // Loads the product page with the sorted list of products in accordance with the sorting criteria
                res.render('viewTransaction', {transaction: result});
            }
        });
    },

    /**
     * This function displays the add transaction page following a get request from a user. 
     *
     * @param req the object containing the HTTP request to access the products page
     * @param res the object to send back the appropriate HTTP response to either allow or reject user access to the products page
     */
    addTransaction: function (req, res) {

        res.render('addTransaction');
    },

    /**
     * This function adds a transaction to the database based on the info provided by the user in the add transaction page.
     *
     * @param req the object containing the HTTP request to access the products page
     * @param res the object to send back the appropriate HTTP response to either allow or reject user access to the products page
     */
    postTransaction: function (req, res) {

        // Initialize variables from page
        var status = "No Status";
        var date = req.body.date;

        var deliveryNumber = req.body.delivery_receipt_no;
        var invoiceNumber = req.body.sales_invoice_no;
        var truckNumber = req.body.truck_plate_no;
        var customerName = req.body.customer_name;
        var address = req.body.address;
        var tinNumber = req.body.tin_no;
        var dieselCheck = req.body.add_checkbox_diesel;
        var gasolineCheck = req.body.add_checkbox_gasoline;
        var premium95Check = req.body.add_checkbox_premium95;
        var premium97Check = req.body.add_checkbox_premium97;
        var keroseneCheck = req.body.add_checkbox_kerosene;
        var totalAmount = 0;
        var hasProductObject = {
            hasDiesel: false,
            hasGasoline: false,
            hasPremium95: false,
            hasPremium97: false,
            hasKerosene: false
        };
        var signatories = {
            prepared: req.body.prepared_by,
            loaded: req.body.loaded_by,
            driver: req.body.driver,
            guard: req.body.guard,
            customerRep: req.body.customer_representative,
            deliveryApproved: req.body.delivery_approved_by,
            deliveryChecked: req.body.delivery_checked_by
        };
        var remarks = req.body.remarks;
        var transactionId = uniqid('transaction-');
        var dieselObject = null;
        var gasolineObject = null;
        var premium95Object = null; 
        var premium97Object = null;
        var keroseneObject = null;

        // Date Manipulation
        var dateArray = date.split('-');
        var dateString = dateArray[1] + '/' + dateArray[2] + '/' + dateArray[0];

        console.log("DIESEL CHECK: " + dieselCheck);
        console.log("GAS CHECK: " + gasolineCheck);
        console.log("95 CHECK: " + premium95Check);
        console.log("97 CHECK: " + premium97Check);
        console.log("KEROSENE CHECK: " + keroseneCheck);

        // Checks if the transaction contains a purchase of diesel
        if(dieselCheck == "on"){
            var dieselQuantity = req.body.diesel_quantity;
            var dieselSellingPrice = req.body.diesel_selling_price;
            var dieselAmount = dieselQuantity * dieselSellingPrice;
            totalAmount += dieselAmount;
            var totalDiesel = dieselAmount.toFixed(2);
            dieselObject = {
                product: "Diesel",
                quantity: dieselQuantity,
                sellingPrice: dieselSellingPrice,
                totalPrice: totalDiesel
            }
            hasProductObject.hasDiesel = true;
        }

        // Checks if the transaction contains a purchase of gasoline
        if(gasolineCheck == "on"){
            var gasolineQuantity = req.body.gasoline_quantity;
            var gasolineSellingPrice = req.body.gasoline_selling_price;
            var gasolineAmount = gasolineQuantity * gasolineSellingPrice;
            totalAmount += gasolineAmount;
            var totalGasoline = gasolineAmount.toFixed(2);
            gasolineObject = {
                product: "Gasoline",
                quantity: gasolineQuantity,
                sellingPrice: gasolineSellingPrice,
                totalPrice: totalGasoline
            }
            hasProductObject.hasGasoline = true
        }

        // Checks if the transaction contains a purchase of premium 95
        if(premium95Check == "on"){
            var premium95Quantity = req.body.premium95_quantity;
            var premium95SellingPrice = req.body.premium95_selling_price;
            var premium95Amount = premium95Quantity * premium95SellingPrice;
            totalAmount += premium95Amount;
            var totalPremium95 = premium95Amount.toFixed(2);
            premium95Object = {
                product: "Premium 95 Gasoline",
                quantity: premium95Quantity,
                sellingPrice: premium95SellingPrice,
                totalPrice: totalPremium95
            }
            hasProductObject.hasPremium95 = true;
        }

        // Checks if the transaction contains a purchase of premium 97
        if(premium97Check == "on"){
            var premium97Quantity = req.body.premium97_quantity;
            var premium97SellingPrice = req.body.premium97_selling_price;
            var premium97Amount = premium97Quantity * premium97SellingPrice;
            totalAmount += premium97Amount;
            var totalPremium97 = premium97Amount.toFixed(2);
            premium97Object = {
                product: "Premium 97 Gasoline",
                quantity: premium97Quantity,
                sellingPrice: premium97SellingPrice,
                totalPrice: totalPremium97
            }
            hasProductObject.hasPremium97 = true;
            
        }

        // Checks if the transaction contains a purchase of kerosene
        if(keroseneCheck == "on"){
            var keroseneQuantity = req.body.kerosene_quantity;
            var keroseneSellingPrice = req.body.kerosene_selling_price;
            var keroseneAmount = keroseneQuantity * keroseneSellingPrice;
            totalAmount += keroseneAmount;
            var totalKerosene = keroseneAmount.toFixed(2);
            keroseneObject = {
                product: "Kerosene",
                quantity: keroseneQuantity,
                sellingPrice: keroseneSellingPrice,
                totalPrice: totalKerosene
            }
            hasProductObject.hasKerosene = true;
        }

        var newTransaction = {
            status: status, 
            deliveryNumber: deliveryNumber,
            invoiceNumber: invoiceNumber,
            truckPlateNumber: truckNumber,
            customerName: customerName,
            address: address,
            tinNumber: tinNumber,
            date: date,
            dateString: dateString, 
            transactionId: transactionId,
            dieselObject: dieselObject,
            gasolineObject: gasolineObject,
            premium95Object: premium95Object,
            premium97Object: premium97Object,
            keroseneObject: keroseneObject,
            signatories: signatories,
            hasProductObject: hasProductObject,
            totalAmount: totalAmount,
            remarks: remarks,
            isDelivered: false
        }

        console.log(newTransaction);

        // Adds the transaction and all indicated details to the database and redirects to the transactions page on success
        db.insertOne(Transaction, newTransaction, function(flag) {
            if(flag)
                res.redirect('/transactions');
            else
                console.log('Error adding product to database.');
        });
    },

    /**
     * This function cancels a transaction upon a get request from the user.
     *
     * @param req the object containing the HTTP request to access the products page
     * @param res the object to send back the appropriate HTTP response to either allow or reject user access to the products page
     */
    cancelTransaction: function (req, res) {

        var transactionId = req.query.transactionId;

        db.updateOne(Transaction, {transactionId: transactionId}, {$set: {status: 'Canceled', isDelivered: true}}, function(result) {

            res.send(result);
        });
    }
}

module.exports = transactionsController;
