// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `Product` from `../models/ProductModel.js`
const Transaction = require('../models/TransactionModel.js');

// import module `Product` from `../models/ProductModel.js`
const Product = require('../models/ProductModel.js');

// import module mongoose
const mongoose = require('mongoose');

const editTransactionController = {

    /**
     * This function displays the edit transaction page of a certain transaction following a get request from a user. 
     *
     * @param req the object containing the HTTP request to access the edit page of a specific transaction
     * @param res the object to send back the appropriate HTTP response to allow the user access to the edit transaction page
     */
    editTransaction: function (req, res) {
        var transactionId = req.query.edit_button;

        db.findOne(Transaction, {transactionId: transactionId}, '', function (result) {
            if(result) {
                var dateArray = result.dateString.split('/');
                var dateString = dateArray[2] + '-' + dateArray[0] + '-' + dateArray[1];
                result.inputFieldDateString = dateString;
                result.transactionEditorRole = req.session.role;

                if(result.hasProductObject.hasDiesel){
                    var totalDiesel = parseFloat(result.dieselObject.totalPrice);
                    result.dieselObject.totalPrice = totalDiesel;
                }

                if(result.hasProductObject.hasGasoline){
                    var totalGasoline = parseFloat(result.gasolineObject.totalPrice);
                    result.gasolineObject.totalPrice = totalGasoline;
                }

                if(result.hasProductObject.hasPremium95){
                    var totalPremium95 = parseFloat(result.premium95Object.totalPrice);
                    result.premium95Object.totalPrice = totalPremium95;
                }

                if(result.hasProductObject.hasPremium97){
                    var totalPremium97 = parseFloat(result.premium97Object.totalPrice);
                    result.premium97Object.totalPrice = totalPremium97;
                }

                if(result.hasProductObject.hasKerosene){
                    var totalKerosene = parseFloat(result.keroseneObject.totalPrice);
                    result.keroseneObject.totalPrice = totalKerosene;
                }

                // Loads the edit transaction page with the specific product chosen from the transactions page
                res.render('editTransaction', {transaction: result});
            }
        });


    },

    /**
     * This function edits a transaction's data in the database based on the info changed by the user in the edit transaction page.
     *
     * @param req the object containing the HTTP request to access the products page
     * @param res the object to send back the appropriate HTTP response to either allow or reject user access to the products page
     */
    postSubmitEditTransaction: function (req, res) {

        // Initialize variables from page
        var status = req.body.status;
        var statusOther = req.body.status_dropdown;
        var isDelivered = false;

        if(status == undefined){
            status = statusOther;
        }
        if(status == "Delivered Completely")
            isDelivered = true;

        var date = req.body.date;
        var deliveryNumber = req.body.delivery_receipt_no;
        var invoiceNumber = req.body.sales_invoice_no;
        var truckNumber = req.body.truck_plate_no;
        var customerName = req.body.customer_name;
        var address = req.body.edit_address;
        var tinNumber = req.body.tin_no;
        var dieselCheck = req.body.edit_checkbox_diesel;
        var gasolineCheck = req.body.edit_checkbox_gasoline;
        var premium95Check = req.body.edit_checkbox_premium95;
        var premium97Check = req.body.edit_checkbox_premium97;
        var keroseneCheck = req.body.edit_checkbox_kerosene;
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
        var transactionId = req.body.submit_button;

        // Date Manipulation
        var dateArray = date.split('-');
        var dateString = dateArray[1] + '/' + dateArray[2] + '/' + dateArray[0];

        // Checks if the transaction contains a purchase of diesel
        if(dieselCheck == "on"){
            var dieselQuantity = req.body.diesel_quantity;
            var dieselSellingPrice = req.body.diesel_selling_price;
            var dieselAmount = dieselQuantity * dieselSellingPrice;
            totalAmount += dieselAmount;
            var totalDiesel = dieselAmount.toFixed(2);
            var dieselObject = {
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
            var gasolineObject = {
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
            var premium95Object = {
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
            var premium97Object = {
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
            var keroseneObject = {
                product: "Kerosene",
                quantity: keroseneQuantity,
                sellingPrice: keroseneSellingPrice,
                totalPrice: totalKerosene
            }
            hasProductObject.hasKerosene = true;
        }

        totalAmount = Math.round((totalAmount + Number.EPSILON) * 100) / 100;
        var total = totalAmount.toFixed(2);

        var editedTransaction = {
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
            totalAmount: total,
            remarks: remarks,
            isDelivered: isDelivered
        }

        // Updates the transaction and all indicated details to the database and redirects to the transactions page on success
        db.updateOne(Transaction, {transactionId: transactionId}, editedTransaction, function(result) {

            // Performs necessary amount deductions on the products database once the product is delivered completely
            if(isDelivered){


                // Checks if the transaction contains a purchase of diesel
                if(dieselCheck == "on"){
                    db.findManyAndSort(Product, {product: "Diesel"}, {date: 'asc'}, function (result) {
                        if(result) {
                            var tempQuantity = dieselObject.quantity;
                            var isEnd = false;

                            // Deducts from diesel products until the quantity indicated in the transaction is 0
                            while(tempQuantity != 0){
                                for(var i = 0; i < result.length; i++){
                                    if(result[i].quantity > 0){
                                        console.log("BEFORE: " + result[i]);
                                        if(result[i].quantity >= tempQuantity){
                                            result[i].quantity = result[i].quantity - tempQuantity;
                                            tempQuantity = 0;
                                            isEnd = true;
                                        }
                                        else{
                                            tempQuantity = tempQuantity - result[i].quantity;
                                            result[i].quantity = 0;
                                        }
                                    }
                                    console.log("AFTER: " + result[i]);
                                    db.updateOne(Product, {productId: result[i].productId}, result[i], function(res){});
                                    if(isEnd)
                                        break;
                                }
                            }
                        }
                    });
                }

                // Checks if the transaction contains a purchase of gasoline
                if(gasolineCheck == "on"){
                    db.findManyAndSort(Product, {product: "Gasoline"}, {date: 'asc'}, function (result) {
                        if(result) {
                            var tempQuantity = gasolineObject.quantity;
                            var isEnd = false;

                            // Deducts from gasoline products until the quantity indicated in the transaction is 0
                            while(tempQuantity != 0){
                                for(var i = 0; i < result.length; i++){
                                    if(result[i].quantity > 0){
                                        console.log("BEFORE: " + result[i]);
                                        if(result[i].quantity >= tempQuantity){
                                            result[i].quantity = result[i].quantity - tempQuantity;
                                            tempQuantity = 0;
                                            isEnd = true;
                                        }
                                        else{
                                            tempQuantity = tempQuantity - result[i].quantity;
                                            result[i].quantity = 0;
                                        }
                                    }
                                    console.log("AFTER: " + result[i]);
                                    db.updateOne(Product, {productId: result[i].productId}, result[i], function(res){});
                                    if(isEnd)
                                        break;
                                }
                            }
                        }
                    });
                }

                // Checks if the transaction contains a purchase of premium gasoline 95
                if(premium95Check == "on"){
                    db.findManyAndSort(Product, {product: "Premium Gasoline 95"}, {date: 'asc'}, function (result) {
                        if(result) {
                            var tempQuantity = premium95Object.quantity;
                            var isEnd = false;

                            // Deducts from premium gasoline 95 products until the quantity indicated in the transaction is 0
                            while(tempQuantity != 0){
                                for(var i = 0; i < result.length; i++){
                                    if(result[i].quantity > 0){
                                        console.log("BEFORE: " + result[i]);
                                        if(result[i].quantity >= tempQuantity){
                                            result[i].quantity = result[i].quantity - tempQuantity;
                                            tempQuantity = 0;
                                            isEnd = true;
                                        }
                                        else{
                                            tempQuantity = tempQuantity - result[i].quantity;
                                            result[i].quantity = 0;
                                        }
                                    }
                                    console.log("AFTER: " + result[i]);
                                    db.updateOne(Product, {productId: result[i].productId}, result[i], function(res){});
                                    if(isEnd)
                                        break;
                                }
                            }
                        }
                    });
                }

                // Checks if the transaction contains a purchase of premium gasoline 97
                if(premium97Check == "on"){
                    db.findManyAndSort(Product, {product: "Premium Gasoline 97"}, {date: 'asc'}, function (result) {
                        if(result) {
                            var tempQuantity = premium97Object.quantity;
                            var isEnd = false;

                            // Deducts from premium gasoline 97 products until the quantity indicated in the transaction is 0
                            while(tempQuantity != 0){
                                for(var i = 0; i < result.length; i++){
                                    if(result[i].quantity > 0){
                                        console.log("BEFORE: " + result[i]);
                                        if(result[i].quantity >= tempQuantity){
                                            result[i].quantity = result[i].quantity - tempQuantity;
                                            tempQuantity = 0;
                                            isEnd = true;
                                        }
                                        else{
                                            tempQuantity = tempQuantity - result[i].quantity;
                                            result[i].quantity = 0;
                                        }
                                    }
                                    console.log("AFTER: " + result[i]);
                                    db.updateOne(Product, {productId: result[i].productId}, result[i], function(res){});
                                    if(isEnd)
                                        break;
                                }
                            }
                        }
                    });
                }

                // Checks if the transaction contains a purchase of kerosene
                if(keroseneCheck == "on"){
                    db.findManyAndSort(Product, {product: "Kerosene"}, {date: 'asc'}, function (result) {
                        if(result) {
                            var tempQuantity = keroseneObject.quantity;
                            var isEnd = false;

                            // Deducts from kerosene products until the quantity indicated in the transaction is 0
                            while(tempQuantity != 0){
                                for(var i = 0; i < result.length; i++){
                                    if(result[i].quantity > 0){
                                        console.log("BEFORE: " + result[i]);
                                        if(result[i].quantity >= tempQuantity){
                                            result[i].quantity = result[i].quantity - tempQuantity;
                                            tempQuantity = 0;
                                            isEnd = true;
                                        }
                                        else{
                                            tempQuantity = tempQuantity - result[i].quantity;
                                            result[i].quantity = 0;
                                        }
                                    }
                                    console.log("AFTER: " + result[i]);
                                    db.updateOne(Product, {productId: result[i].productId}, result[i], function(res){});
                                    if(isEnd)
                                        break;
                                }
                            }
                        }
                    });
                }
            }

            res.redirect('/transactions');
        });
    }
}

module.exports = editTransactionController;
