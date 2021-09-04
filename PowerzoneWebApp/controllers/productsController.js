const db = require('../models/db.js');

const Product = require('../models/ProductModel.js');

function displaySorted(res, sortCriteria, dateSort, supplierSort, quantitySort, productSort, buyPriceSort, amountSort, locationSort){
	
	var productsArray;
	var newDate;
	var dieselTotal = 0;
	var gasolineTotal = 0;
	var premium95Total = 0;
	var premium97Total = 0;
	var keroseneTotal = 0;

	db.findManyAndSort(Product, {}, sortCriteria, function (result) {
	    if(result) {
	    	productsArray = result;

	    	//Perform necessary data manipulation
	    	for(var i = 0; i < productsArray.length; i++){
	    		var withdrawalAmount = productsArray[i].quantity * productsArray[i].price;
	    		productsArray[i].withdrawal = withdrawalAmount.toFixed(2);

	    		if(productsArray[i].product == 'Diesel'){
	    			dieselTotal += parseFloat(result[i].quantity);
	    		}
	    		else if(productsArray[i].product == 'Gasoline'){
	    			gasolineTotal += parseFloat(result[i].quantity);
	    		}
	    		else if(productsArray[i].product == 'Premium Gasoline 95'){
                    premium95Total += parseFloat(result[i].quantity);
	    		}
	    		else if(productsArray[i].product == 'Premium Gasoline 97'){
	    			premium97Total += parseFloat(result[i].quantity);
	    		}
	    		else if(productsArray[i].product == 'Kerosene'){
	    			keroseneTotal += parseFloat(result[i].quantity);
	    		}
	    	}

	    	var totals = {
	    		dieselTotal: dieselTotal.toFixed(2),
	        	gasolineTotal: gasolineTotal.toFixed(2),
	        	premium95Total: premium95Total.toFixed(2),
	        	premium97Total: premium97Total.toFixed(2),
	        	keroseneTotal: keroseneTotal.toFixed(2)
	    	}


	    	var sortCriteria = {
	    		dateSort: dateSort,
	    		supplierSort: supplierSort,
	    		quantitySort: quantitySort,
	    		productSort: productSort,
	    		buyPriceSort: buyPriceSort,
	    		amountSort: amountSort,
	    		locationSort: locationSort
	    	}

	        res.render('product', {u: {
	        	productsArray: productsArray,
	        	totals: totals,
	        	sortCriteria: sortCriteria
	        }});
	    }
	});
}

const productsController = {

    getProducts: function (req, res) {

    	if(req.session.role != "Administrator" && req.session.role != "Depot Supervisor" 
    		&& req.session.role != "Depot Cashier" && req.session.role != "Regular User" && req.session.role != "Depot General Manager") {

	        var details = {error: `User is not logged in. Please log in first.`}

            res.render('login', details);
        }

    	var productsArray;
    	var tempDate = new Date();
    	var newDate;
    	var dieselTotal = 0;
    	var gasolineTotal = 0;
    	var premium95Total = 0;
    	var premium97Total = 0;
    	var keroseneTotal = 0;

    	db.findMany(Product, {}, '', function (result) {
		    if(result) {
		    	productsArray = result;

		    	//Perform necessary data manipulation
		    	for(var i = 0; i < productsArray.length; i++){
		    		var withdrawalAmount = productsArray[i].quantity * productsArray[i].price;
		    		productsArray[i].withdrawal = withdrawalAmount.toFixed(2);

		    		if(productsArray[i].product == 'Diesel'){
		    			dieselTotal += parseFloat(result[i].quantity);
		    		}
		    		else if(productsArray[i].product == 'Gasoline'){
		    			gasolineTotal += parseFloat(result[i].quantity);
		    		}
		    		else if(productsArray[i].product == 'Premium Gasoline 95'){
                        premium95Total += parseFloat(result[i].quantity);
		    		}
		    		else if(productsArray[i].product == 'Premium Gasoline 97'){
		    			premium97Total += parseFloat(result[i].quantity);
		    		}
		    		else if(productsArray[i].product == 'Kerosene'){
		    			keroseneTotal += parseFloat(result[i].quantity);
		    		}
		    	}

		    	var totals = {
		    		dieselTotal: dieselTotal.toFixed(2),
		        	gasolineTotal: gasolineTotal.toFixed(2),
		        	premium95Total: premium95Total.toFixed(2),
		        	premium97Total: premium97Total.toFixed(2),
		        	keroseneTotal: keroseneTotal.toFixed(2)
		    	}

		    	console.log(totals)

		    	var sortCriteria = {
		    		dateSort: 'ascending',
		    		supplierSort: 'ascending',
		    		quantitySort: 'ascending',
		    		productSort: 'ascending',
		    		buyPriceSort: 'ascending',
		    		amountSort: 'ascending',
		    		locationSort: 'ascending'
		    	}

		        res.render('product', {u: {
		        	productsArray: productsArray,
		        	totals: totals,
		        	sortCriteria: sortCriteria
		        }});
		    }
		});
    },

    sortByDate: function(req, res){
    	var sortCriteria = req.query.filter_date;
    	var sortStatus;
    	
    	if(sortCriteria == "ascending"){
    		sortCriteria = {date: 'asc'};
    		sortStatus = "descending"
    	}
    	else if(sortCriteria == "descending"){
    		sortCriteria = {date: 'desc'};
    		sortStatus = "ascending"
    	}

		displaySorted(res, sortCriteria, sortStatus, "ascending", "ascending", "ascending", "ascending", "ascending", "ascending");
    },

    sortBySupplier: function(req, res){
    	var sortCriteria = req.query.filter_supplier;
    	var sortStatus;
    	
    	if(sortCriteria == "ascending"){
    		sortCriteria = {supplier: 'asc'};
    		sortStatus = "descending"
    	}
    	else if(sortCriteria == "descending"){
    		sortCriteria = {supplier: 'desc'};
    		sortStatus = "ascending"
    	}

    	displaySorted(res, sortCriteria, "ascending", sortStatus, "ascending", "ascending", "ascending", "ascending", "ascending");
    },

    sortByQuantity: function(req, res){
    	var sortCriteria = req.query.filter_quantity;
    	var sortStatus;
    	
    	if(sortCriteria == "ascending"){
    		sortCriteria = {quantity: 'asc'};
    		sortStatus = "descending"
    	}
    	else if(sortCriteria == "descending"){
    		sortCriteria = {quantity: 'desc'};
    		sortStatus = "ascending"
    	}

    	displaySorted(res, sortCriteria, "ascending", "ascending", sortStatus, "ascending", "ascending", "ascending", "ascending");
    },

    sortByProduct: function(req, res){
    	var sortCriteria = req.query.filter_product;
    	var sortStatus;
    	
    	if(sortCriteria == "ascending"){
    		sortCriteria = {product: 'asc'};
    		sortStatus = "descending"
    	}
    	else if(sortCriteria == "descending"){
    		sortCriteria = {product: 'desc'};
    		sortStatus = "ascending"
    	}

    	displaySorted(res, sortCriteria, "ascending", "ascending", "ascending", sortStatus, "ascending", "ascending", "ascending");
    },

    sortByPrice: function(req, res){
    	var sortCriteria = req.query.filter_price;
    	var sortStatus;
    	
    	if(sortCriteria == "ascending"){
    		sortCriteria = {price: 'asc'};
    		sortStatus = "descending"
    	}
    	else if(sortCriteria == "descending"){
    		sortCriteria = {price: 'desc'};
    		sortStatus = "ascending"
    	}

    	displaySorted(res, sortCriteria, "ascending", "ascending", "ascending", "ascending", sortStatus, "ascending", "ascending");
    },

    sortByAmount: function(req, res){
    	var sortCriteria = req.query.filter_amount;
    	var sortStatus;
    	
    	if(sortCriteria == "ascending"){
    		sortCriteria = {withdrawalAmount: 'asc'};
    		sortStatus = "descending"
    	}
    	else if(sortCriteria == "descending"){
    		sortCriteria = {withdrawalAmount: 'desc'};
    		sortStatus = "ascending"
    	}

    	displaySorted(res, sortCriteria, "ascending", "ascending", "ascending", "ascending", "ascending", sortStatus, "ascending");
    },

    sortByLocation: function(req, res){
    	var sortCriteria = req.query.filter_location;
    	var sortStatus;
    	
    	if(sortCriteria == "ascending"){
    		sortCriteria = {location: 'asc'};
    		sortStatus = "descending"
    	}
    	else if(sortCriteria == "descending"){
    		sortCriteria = {location: 'desc'};
    		sortStatus = "ascending"
    	}

    	displaySorted(res, sortCriteria, "ascending", "ascending", "ascending", "ascending", "ascending", "ascending", sortStatus);
    }
}


module.exports = productsController;
