const db = require('../models/db.js');

const Product = require('../models/ProductModel.js');

const editProductController = {

    editProduct: function (req, res) {
        if(req.session.role != "Administrator"){
            if(req.session.role == "Depot Supervisor" || 
                req.session.role == "Depot Cashier" ||
                req.session.role == "User") {

                    var details = {error: `User is unauthorized to access the page. Please log in with an authorized account.`}
                    req.session.destroy(function(err){
                    if(err) throw err;
                    else console.log('Logout Successful.');

                });
            }
            else
                var details = {error: `User is not logged in. Please log in first.`}

            res.render('login', details);
        }
        res.render('editProduct');
    },

    getEditProduct: function (req, res) {

    	var uniqueId = req.query.productId;
    	console.log("uniqid = " + uniqueId);

    	db.findOne(Product, {productId: uniqueId}, '', function (result) {
            if(result) {

            	var dateArray = result.dateString.split('/');
            	result.dateString = dateArray[2] + '-' + dateArray[0] + '-' + dateArray[1];
                console.log(result);
                res.send(result);
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
