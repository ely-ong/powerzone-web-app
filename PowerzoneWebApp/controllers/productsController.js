const db = require('../models/db.js');

const Product = require('../models/ProductModel.js');

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

		        res.render('product', {u: {
		        	productsArray: productsArray,
		        	totals: totals
		        }});
		    }
		});
    },
}


module.exports = productsController;
