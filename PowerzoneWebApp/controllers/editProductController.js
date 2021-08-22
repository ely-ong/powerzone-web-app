const db = require('../models/db.js');

const Product = require('../models/ProductModel.js');

const editProductController = {

    getEditProduct: function (req, res) {

    	var uniqueId = req.query.edit_button;
    	console.log("uniqid = " + uniqueId);

    	db.findOne(Product, {productId: uniqueId}, '', function (result) {
            if(result) {

            	var dateArray = result.dateString.split('/');
            	result.dateString = dateArray[2] + '-' + dateArray[0] + '-' + dateArray[1];
                
                res.render('editProduct', {result: result});
            }

            // User not in database
            else {
            	res.render('error');
            }
        });
    },

    updateProduct: function(req, res) {

    	console.log('Enter');

    	var uniqueId = req.query.product_id_holder;
    	var supplier = req.query.supplier;
    	var date = req.query.date_purchase;
    	var qty = req.query.quantity;
    	var product = req.query.product;
    	var price = req.query.price_liter;
    	var location = req.query.stock_location;

    	var dateArray = date.split('-');
        console.log(dateArray); 

        var newDate = dateArray[1] + '/' + dateArray[2] + '/' + dateArray[0];

    	db.updateOne(Product, {productId: uniqueId}, {$set: {
    		quantity: qty,
    		supplier: supplier,
    		price: price,
    		location: location,
    		dateString: newDate,
    		date: date, 
    		product: product
    	}}, function(result){
    		res.redirect('/products');
    	});
    }
}


module.exports = editProductController;
