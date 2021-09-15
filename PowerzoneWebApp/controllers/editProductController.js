// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `Product` from `../models/ProductModel.js`
const Product = require('../models/ProductModel.js');

const editProductController = {

    /**
     * This function displays the edit product page following a get request from a user. This function also checks the role of the 
     * currently logged in user and directs them to the edit product page if the appropriate role is used to access the page. 
     *
     * @param req the object containing the HTTP request to access the edit product page
     * @param res the object to send back the appropriate HTTP response to either allow or reject user access to the edit product page
     */
    editProduct: function (req, res) {

        // This conditional statement checks if the user is not an Administrator nor a Depot General Manager (i.e., unauthorized account)
        if(req.session.role != "Administrator" && req.session.role != "Depot General Manager") {

            /** 
             * This conditional statement checks if the user is logged in and does not have the authorized role to access the page.
             * In the event of unauthorized access, user will be logged out of the session and will be asked to log in with an
             * authorized account instead.
             */
            if(req.session.role == "Depot Supervisor" || req.session.role == "Depot Cashier" || req.session.role == "Regular User") {

                var details = {error: `User is unauthorized to access the page. Please log in with an authorized account.`}
                req.session.destroy(function(err) {
                    if(err) 
                        throw err;
                    else 
                        console.log('Logout Successful.');

                });
            }
            // Loads an error message to ask the user to log in before trying to access any page of the website
            else
                var details = {error: `User is not logged in. Please log in first.`}

            // Re-loads the login page with the appropriate error message
            res.render('login', details);
        }
        // Displays the edit product page if the logged-in account is authorized
        else
            res.render('editProduct');
    },

    /**
     * This is a helper function to load the products changeable details from the database as placeholders in the input fields found 
     * in the edit product page.
     *
     * @param req the object containing the HTTP request to find the product being edited and all its details from the database
     * @param res the object to send back the appropriate HTTP response containing the details of the product being edited
     */
    getEditProduct: function (req, res) {

        // Obtains the unique id of the product from the get request
    	var uniqueId = req.query.productId;

        // Finds the product from the database using the unique id
    	db.findOne(Product, {productId: uniqueId}, '', function (result) {
            if(result) {
            	var dateArray = result.dateString.split('/');
            	result.dateString = dateArray[2] + '-' + dateArray[0] + '-' + dateArray[1];
                
                res.send(result);
            }
            // Loads the error page if the product cannot be found in the database
            else
            	res.render('error');
        });
    },

    /**
     * This function edits a user's details following a post request from a user
     *
     * @param req the object containing the HTTP request to edit a product with the received details in the HTML input fields
     * @param res the object to send back the appropriate HTTP response to edit a products's details after the post request
     */
    updateProduct: function(req, res) {

        // Obtains the information needed to edit a products's details from the database
    	var uniqueId = req.query.product_id_holder;
    	var supplier = req.query.supplier;
    	var date = req.query.date_purchase;
    	var qty = req.query.quantity;
    	var product = req.query.product;
    	var price = req.query.price_liter;
    	var location = req.query.stock_location;

        // Creates a String of the product's date of purchase
    	var dateArray = date.split('-');
        var newDate = dateArray[1] + '/' + dateArray[2] + '/' + dateArray[0];

        //updates the product details from the database
    	db.updateOne(Product, {productId: uniqueId}, {$set: {
    		quantity: qty,
    		supplier: supplier,
    		price: price,
    		location: location,
    		dateString: newDate,
    		date: date, 
    		product: product
    	}}, function(result) {
    		res.redirect('/products');
    	});
    }
}


module.exports = editProductController;
