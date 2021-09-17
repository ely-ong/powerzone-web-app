// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `Product` from `../models/ProductModel.js`
const Transaction = require('../models/TransactionModel.js');

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

                // Loads the product page with the sorted list of products in accordance with the sorting criteria
                res.render('viewTransaction', {transaction: result});
            }
        });
    }
}

module.exports = transactionsController;
