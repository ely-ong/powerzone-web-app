const db = require('../models/db.js');

const Product = require('../models/ProductModel.js');

const productsController = {

    getProducts: function (req, res) {

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
		    		tempDate = productsArray[i].date;
		    		var year = tempDate.getYear() + 1900;
		    		var month = tempDate.getMonth() + 1;
		    		var day = tempDate.getDate();

		    		//Reformatting Month 
		    		if(month < 10)
		    			month = "0" + month;
		    		
		    		//Reformatting Day 
		    		if(day < 10)
		    			day = "0" + day;

		    		newDate = day + "/" + month + "/" + year;
		    		productsArray[i].dateString = newDate;

		    		var withdrawalAmount = productsArray[i].quantity * productsArray[i].price;
		    		productsArray[i].withdrawal = withdrawalAmount.toFixed(2);

		    		if(productsArray[i].product == 'Diesel'){
                        dieselTotal += parseFloat(result[i].quantity);
		    			productsArray[i].balance = dieselTotal.toFixed(2);
		    		}
		    		else if(productsArray[i].product == 'Gasoline'){
                        gasolineTotal += parseFloat(result[i].quantity);
		    			productsArray[i].balance = gasolineTotal.toFixed(2);
		    		}
		    		else if(productsArray[i].product == 'Premium Gasoline 95'){
		    			premium95Total += parseFloat(result[i].quantity);
                        productsArray[i].balance = premium95Total.toFixed(2);
		    		}
		    		else if(productsArray[i].product == 'Premium Gasoline 97'){
                        premium97Total += parseFloat(result[i].quantity);   
		    			productsArray[i].balance = premium97Total.toFixed(2);
		    		}
		    		else if(productsArray[i].product == 'Kerosene'){
                        keroseneTotal += parseFloat(result[i].quantity);
		    			productsArray[i].balance = keroseneTotal.toFixed(2);
		    		}
		    	}

		        res.render('product', {productsArray});
		    }
		});
    },
}


module.exports = productsController;
