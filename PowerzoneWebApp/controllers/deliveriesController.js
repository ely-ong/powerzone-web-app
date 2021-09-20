// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `Product` from `../models/ProductModel.js`
const Transaction = require('../models/TransactionModel.js');

/**
 * This a helper function that displays the deliveries page sorted based on the get request acquired from a user
 *
 * @param req the object containing the HTTP request to sort the deliveries by a specified criteria
 * @param res the object to send back the appropriate HTTP response to load the sorted deliveries page
 * @param sortCriteria the object containing the search query to be used on the database
 * @param statusSort the object holding the sort status of the date column
 * @param dateSort the object holding the sort status of the supplier column
 * @param receiptNoSort the object holding the sort status of the quantity column
 * @param salesInvoiceSort the object holding the sort status of the product column
 * @param customerSort the object holding the sort status of the buying price column
 */
function displaySorted(req, res, sortCriteria, dateSort, statusSort) {
    // This conditional statement checks if the user is not logged in to a company account and is unauthorized to view the page
    if(req.session.role != "Administrator" && req.session.role != "Depot Supervisor" && req.session.role != "Depot Cashier" && 
        req.session.role != "Regular User" && req.session.role != "Depot General Manager") {

        var details = {error: `User is not logged in. Please log in first.`}

        // Re-loads the login page with the appropriate error message
        res.render('login', details);
    }
    // Loads the deliveries page if the logged-in account is authorized
    else{
        // Initialize the object containing all the transactions
        var transactions = [];

        // Submits a query to the database to return the list of all recorded transactions sorted by the given criteria
        db.findManyAndSort(Transaction, {}, sortCriteria, function (result) {
            if(result) {
                transactions = result;

                // Creates an object for the sort status of each column reflected in the back-end of the deliveries page
                var sortCriteria = {
                    dateSort: dateSort,
                    statusSort: statusSort
                }

                // Loads the product page with the sorted list of transactions in accordance with the sorting criteria
                res.render('deliveries', {u: {
                    transactions: transactions,
                    sortCriteria: sortCriteria
                }});
            }
        });
    }
}

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
            var transactions = [];

            // Submits a query to the database to return the list of all recorded transactions
            db.findMany(Transaction, {}, '', function (result) {
                if(result) {
                    transactions = result;

                    // Creates an object for the sort status of each column reflected in the back-end of the products page
                    var sortCriteria = {
                        dateSort: "ascending",
                        statusSort: "ascending"
                    }

                    // Loads the product page with the sorted list of transactions in accordance with the sorting criteria
                    res.render('deliveries', {u: {
                        transactions: transactions,
                        sortCriteria: sortCriteria
                    }});
                }
            });
        }
    },

    /**
     * This function sorts the product list by status in either ascending or descending order following a get request from a user.
     *
     * @param req the object containing the HTTP request to sort the product list by status
     * @param res the object to send back the appropriate HTTP response to load the products page sorted by status
     */
    sortByDate: function(req, res) {

        // Obtain the sorting criteria from the get request and initialize the variable for the resulting sort status
        var sortCriteria = req.query.filter_date;
        var sortStatus;
        
        // Sorts in 'ascending' order if the sorting criteria is ascending
        if(sortCriteria == "ascending" || sortCriteria == "ascending_") {
            sortCriteria = {date: 'desc'};
            sortStatus = "descending"
        }

        // Sorts in 'descending' order if the sorting criteria is descending
        else if(sortCriteria == "descending") {
            sortCriteria = {date: 'asc'};
            sortStatus = "ascending_"
        }

        // Calls the helper function above to sort the products by status following either the ascending/descending sorting criteria
        displaySorted(req, res, sortCriteria, sortStatus, "ascending");
    },

    /**
     * This function sorts the product list by status in either ascending or descending order following a get request from a user.
     *
     * @param req the object containing the HTTP request to sort the product list by status
     * @param res the object to send back the appropriate HTTP response to load the products page sorted by status
     */
    sortByStatus: function(req, res) {

        // Obtain the sorting criteria from the get request and initialize the variable for the resulting sort status
        var sortCriteria = req.query.filter_status;
        var sortStatus;
        
        // Sorts in 'ascending' order if the sorting criteria is ascending
        if(sortCriteria == "ascending" || sortCriteria == "ascending_") {
            sortCriteria = {status: 'desc'};
            sortStatus = "descending"
        }

        // Sorts in 'descending' order if the sorting criteria is descending
        else if(sortCriteria == "descending") {
            sortCriteria = {status: 'asc'};
            sortStatus = "ascending_"
        }

        // Calls the helper function above to sort the products by status following either the ascending/descending sorting criteria
        displaySorted(req, res, sortCriteria, "ascending", sortStatus);
    },

}


module.exports = deliveriesController;
