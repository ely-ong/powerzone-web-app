// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `Product` from `../models/ProductModel.js`
const Product = require('../models/ProductModel.js');

/**
 * This a helper function that displays the products page sorted based on the get request acquired from a user
 *
 * @param res the object to send back the appropriate HTTP response to load the sorted products page
 * @param sortCriteria the object containing the search query to be used on the database
 * @param dateSort the object holding the sort status of the date column
 * @param supplierSort the object holding the sort status of the supplier column
 * @param quantitySort the object holding the sort status of the quantity column
 * @param productSort the object holding the sort status of the product column
 * @param buyPriceSort the object holding the sort status of the buying price column
 * @param amountSort the object holding the sort status of the amount column
 * @param locationSort the object holding the sort status of the location column
 */
function displaySorted(res, sortCriteria, dateSort, supplierSort, quantitySort, productSort, buyPriceSort, amountSort, locationSort) {
	
    // Initialize the variables
	var productsArray;
	var newDate;
	var dieselTotal = 0;
	var gasolineTotal = 0;
	var premium95Total = 0;
	var premium97Total = 0;
	var keroseneTotal = 0;
    var one = 1.0;

    // Submits a query to the database to return the list of products sorted by the given criteria
	db.findManyAndSort(Product, {}, sortCriteria, function (result) {
	    if(result) {
	    	productsArray = result;

	    	// Performs necessary data manipulation
	    	for(var i = 0; i < productsArray.length; i++) {
	    		var withdrawalAmount = productsArray[i].quantity * productsArray[i].price * one;
                    
                productsArray[i].formattedQuantity = productsArray[i].quantity.toFixed(2);
                productsArray[i].formattedPrice = productsArray[i].price.toFixed(2);
                productsArray[i].withdrawal = withdrawalAmount.toFixed(2);

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

            // Creates an object for the total quantity of each product type
	    	var totals = {
	    		dieselTotal: dieselTotal.toFixed(2),
	        	gasolineTotal: gasolineTotal.toFixed(2),
	        	premium95Total: premium95Total.toFixed(2),
	        	premium97Total: premium97Total.toFixed(2),
	        	keroseneTotal: keroseneTotal.toFixed(2)
	    	}

            // Creates an object for the sort status of each column reflected in the back-end of the products page
	    	var sortCriteria = {
	    		dateSort: dateSort,
	    		supplierSort: supplierSort,
	    		quantitySort: quantitySort,
	    		productSort: productSort,
	    		buyPriceSort: buyPriceSort,
	    		amountSort: amountSort,
	    		locationSort: locationSort
	    	}

            // Loads the product page with the sorted list of products in accordance with the sorting criteria
	        res.render('product', {u: {
	        	productsArray: productsArray,
	        	totals: totals,
	        	sortCriteria: sortCriteria
	        }});
	    }
	});
}

const productsController = {

    /**
     * This function displays the unsorted products page following a get request from a user. This function also checks if the user 
     * is currently logged in and directs them to the home page once verified. 
     *
     * @param req the object containing the HTTP request to access the products page
     * @param res the object to send back the appropriate HTTP response to either allow or reject user access to the products page
     */
    getProducts: function (req, res) {

        // Deny access to the user if they are not logged in to a valid account
    	if(req.session.role != "Administrator" && req.session.role != "Depot Supervisor" && req.session.role != "Depot Cashier" && 
            req.session.role != "Regular User" && req.session.role != "Depot General Manager") {

	        var details = {error: `User is not logged in. Please log in first.`}

            res.render('login', details);
        }
        else{
            // Initialize the variables
        	var productsArray;
        	var tempDate = new Date();
        	var newDate;
        	var dieselTotal = 0;
        	var gasolineTotal = 0;
        	var premium95Total = 0;
        	var premium97Total = 0;
        	var keroseneTotal = 0;
            var one = 1.0;

            // Submits a query to the database to return the list of all recorded products
        	db.findMany(Product, {}, '', function (result) {
    		    if(result) {
    		    	productsArray = result;

    		    	// Performs necessary data manipulation
    		    	for(var i = 0; i < productsArray.length; i++) {
                        
    		    		var withdrawalAmount = productsArray[i].quantity * productsArray[i].price * one;
                        
                        productsArray[i].formattedQuantity = productsArray[i].quantity.toFixed(2);
                        productsArray[i].formattedPrice = productsArray[i].price.toFixed(2);
    		    		productsArray[i].withdrawal = withdrawalAmount.toFixed(2);

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

                    // Creates an object for the total quantity of each product type
    		    	var totals = {
    		    		dieselTotal: dieselTotal.toFixed(2),
    		        	gasolineTotal: gasolineTotal.toFixed(2),
    		        	premium95Total: premium95Total.toFixed(2),
    		        	premium97Total: premium97Total.toFixed(2),
    		        	keroseneTotal: keroseneTotal.toFixed(2)
    		    	}

                    /** 
                     * Creates an object for the default unsorted status of each column reflected in the back-end of the products page.
                     * Columns with 'ascending' values mean that clicking on these columns would sort the products by that column 
                     * header in ascending order.
                     */
    		    	var sortCriteria = {
    		    		dateSort: 'ascending',
    		    		supplierSort: 'ascending',
    		    		quantitySort: 'ascending',
    		    		productSort: 'ascending',
    		    		buyPriceSort: 'ascending',
    		    		amountSort: 'ascending',
    		    		locationSort: 'ascending'
    		    	}

                    // Loads the product page with the sorted list of products in accordance with the sorting criteria
    		        res.render('product', {u: {
    		        	productsArray: productsArray,
    		        	totals: totals,
    		        	sortCriteria: sortCriteria
    		        }});
    		    }
    		});
        }

    },

    /**
     * This function sorts the product list by date in either ascending or descending order following a get request from a user.
     *
     * @param req the object containing the HTTP request to sort the product list by date
     * @param res the object to send back the appropriate HTTP response to load the products page sorted by date
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

        // Calls the helper function above to sort the products by date following either the ascending/descending sorting criteria
		displaySorted(res, sortCriteria, sortStatus, "ascending", "ascending", "ascending", "ascending", "ascending", "ascending");
    },

    /**
     * This function sorts the product list by supplier in either ascending or descending order following a get request from a user.
     *
     * @param req the object containing the HTTP request to sort the product list by supplier
     * @param res the object to send back the appropriate HTTP response to load the products page sorted by supplier
     */
    sortBySupplier: function(req, res) {
    	
        // Obtain the sorting criteria from the get request and initialize the variable for the resulting sort status
        var sortCriteria = req.query.filter_supplier;
    	var sortStatus;
    	
        // Sorts in 'ascending' order if the sorting criteria is ascending
    	if(sortCriteria == "ascending" || sortCriteria == "ascending_") {
    		sortCriteria = {supplier: 'desc'};
    		sortStatus = "descending"
    	}

        // Sorts in 'descending' order if the sorting criteria is descending
    	else if(sortCriteria == "descending") {
    		sortCriteria = {supplier: 'asc'};
    		sortStatus = "ascending_"
    	}

        // Calls the helper function above to sort the products by supplier following either the ascending/descending sorting criteria
    	displaySorted(res, sortCriteria, "ascending", sortStatus, "ascending", "ascending", "ascending", "ascending", "ascending");
    },

    /**
     * This function sorts the product list by quantity in either ascending or descending order following a get request from a user.
     *
     * @param req the object containing the HTTP request to sort the product list by quantity
     * @param res the object to send back the appropriate HTTP response to load the products page sorted by quantity
     */
    sortByQuantity: function(req, res) {

        // Obtain the sorting criteria from the get request and initialize the variable for the resulting sort status
    	var sortCriteria = req.query.filter_quantity;
    	var sortStatus;
    	
        // Sorts in 'ascending' order if the sorting criteria is ascending
    	if(sortCriteria == "ascending" || sortCriteria == "ascending_") {
    		sortCriteria = {quantity: 'desc'};
    		sortStatus = "descending"
    	}

        // Sorts in 'descending' order if the sorting criteria is descending
    	else if(sortCriteria == "descending") {
    		sortCriteria = {quantity: 'asc'};
    		sortStatus = "ascending_"
    	}

        // Calls the helper function above to sort the products by quantity following either the ascending/descending sorting criteria
    	displaySorted(res, sortCriteria, "ascending", "ascending", sortStatus, "ascending", "ascending", "ascending", "ascending");
    },

    /**
     * This function sorts the product list by product type in either ascending or descending order following a get request from a user.
     *
     * @param req the object containing the HTTP request to sort the product list by product type
     * @param res the object to send back the appropriate HTTP response to load the products page sorted by product type
     */
    sortByProduct: function(req, res) {

        // Obtain the sorting criteria from the get request and initialize the variable for the resulting sort status
    	var sortCriteria = req.query.filter_product;
    	var sortStatus;
    	
        // Sorts in 'ascending' order if the sorting criteria is ascending
    	if(sortCriteria == "ascending" || sortCriteria == "ascending_") {
    		sortCriteria = {product: 'desc'};
    		sortStatus = "descending"
    	}

        // Sorts in 'descending' order if the sorting criteria is descending
    	else if(sortCriteria == "descending") {
    		sortCriteria = {product: 'asc'};
    		sortStatus = "ascending_"
    	}

        // Calls the helper function above to sort the products by product type following either the ascending/descending sorting criteria
    	displaySorted(res, sortCriteria, "ascending", "ascending", "ascending", sortStatus, "ascending", "ascending", "ascending");
    },

    /**
     * This function sorts the product list by price in either ascending or descending order following a get request from a user.
     *
     * @param req the object containing the HTTP request to sort the product list by price
     * @param res the object to send back the appropriate HTTP response to load the products page sorted by price
     */
    sortByPrice: function(req, res) {

        // Obtain the sorting criteria from the get request and initialize the variable for the resulting sort status
    	var sortCriteria = req.query.filter_price;
    	var sortStatus;
    	
        // Sorts in 'ascending' order if the sorting criteria is ascending
    	if(sortCriteria == "ascending" || sortCriteria == "ascending_") {
    		sortCriteria = {price: 'desc'};
    		sortStatus = "descending"
    	}

        // Sorts in 'descending' order if the sorting criteria is descending
    	else if(sortCriteria == "descending") {
    		sortCriteria = {price: 'asc'};
    		sortStatus = "ascending_"
    	}

        // Calls the helper function above to sort the products by price following either the ascending/descending sorting criteria
    	displaySorted(res, sortCriteria, "ascending", "ascending", "ascending", "ascending", sortStatus, "ascending", "ascending");
    },

    /**
     * This function sorts the product list by amount in either ascending or descending order following a get request from a user.
     *
     * @param req the object containing the HTTP request to sort the product list by amount
     * @param res the object to send back the appropriate HTTP response to load the products page sorted by amount
     */
    sortByAmount: function(req, res) {

        // Obtain the sorting criteria from the get request and initialize the variable for the resulting sort status
    	var sortCriteria = req.query.filter_amount;
    	var sortStatus;
    	
        // Sorts in 'ascending' order if the sorting criteria is ascending
    	if(sortCriteria == "ascending" || sortCriteria == "ascending_") {
    		sortCriteria = {withdrawalAmount: 'desc'};
    		sortStatus = "descending"
    	}

        // Sorts in 'descending' order if the sorting criteria is descending
    	else if(sortCriteria == "descending") {
    		sortCriteria = {withdrawalAmount: 'asc'};
    		sortStatus = "ascending_"
    	}

        // Calls the helper function above to sort the products by amount following either the ascending/descending sorting criteria
    	displaySorted(res, sortCriteria, "ascending", "ascending", "ascending", "ascending", "ascending", sortStatus, "ascending");
    },

    /**
     * This function sorts the product list by location in either ascending or descending order following a get request from a user.
     *
     * @param req the object containing the HTTP request to sort the product list by location
     * @param res the object to send back the appropriate HTTP response to load the products page sorted by location
     */
    sortByLocation: function(req, res) {

        // Obtain the sorting criteria from the get request and initialize the variable for the resulting sort status
    	var sortCriteria = req.query.filter_location;
    	var sortStatus;
    	
        // Sorts in 'ascending' order if the sorting criteria is ascending
    	if(sortCriteria == "ascending" || sortCriteria == "ascending_") {
    		sortCriteria = {location: 'desc'};
    		sortStatus = "descending"
    	}

        // Sorts in 'descending' order if the sorting criteria is descending
    	else if(sortCriteria == "descending") {
    		sortCriteria = {location: 'asc'};
    		sortStatus = "ascending_"
    	}

        // Calls the helper function above to sort the products by location following either the ascending/descending sorting criteria
    	displaySorted(res, sortCriteria, "ascending", "ascending", "ascending", "ascending", "ascending", "ascending", sortStatus);
    }
}


module.exports = productsController;
