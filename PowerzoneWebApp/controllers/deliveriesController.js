// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `Product` from `../models/ProductModel.js`
const Transaction = require('../models/TransactionModel.js');

const deliveriesController = {

	/**
     * This function displays the deliveries page following a get request from a user. This function also checks the role of the 
     * currently logged in user and directs them to the add product page if the appropriate role is used to access the page. 
     * This function restricts the access of users not logged in to an existing account as well.
     *
     * @param req the object containing the HTTP request to access the deliveries page
     * @param res the object to send back the appropriate HTTP response to either allow or reject user access to the deliveries page
     */
    getDeliveries: function (req, res) {
    	
    	// This conditional statement checks if the user is not logged in to a company account and is unauthorized to view the page
    	if(req.session.role != "Administrator" && req.session.role != "Depot Supervisor" && req.session.role != "Depot Cashier" && 
    		req.session.role != "Regular User" && req.session.role != "Depot General Manager") {

	        var details = {error: `User is not logged in. Please log in first.`}

	    	// Re-loads the login page with the appropriate error message
            res.render('login', details);
        }
        // Loads the deliveries page if the logged-in account is authorized
        else{

            // Initialize the variables
            var transactionsArray = [];

            // Submits a query to the database to return the list of all recorded transactions
            db.findMany(Transaction, {}, '', function (result) {
                if(result) {
                    transactionsArray = result;

                    // Loads the product page with the sorted list of products in accordance with the sorting criteria
                    res.render('deliveries', {transactions: result});
                }
            });
        }
    },
}


module.exports = deliveriesController;
