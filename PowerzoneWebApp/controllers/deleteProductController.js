// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `Product` from `../models/ProductModel.js`
const Product = require('../models/ProductModel.js');

// import module mongoose
const mongoose = require('mongoose');

const deleteProductController = {

	/**
     * This function deletes an existing product from the database following a get request from an authorized user.
     *
     * @param req the object containing the HTTP request to delete a product from the database
     * @param res the object to send back the HTTP response to delete a product after a get request
     */
    getDeleteProduct: function (req, res) {

    	// This conditional statement checks if the user is not authorized to delete a product from the database
        if(req.session.role == "Administrator"  || req.session.role == "Depot General Manager") {
            db.deleteOne(Product, {productId: req.query.productId});
        }

        // Re-loads the products page once the operation is completed
        res.redirect('/products');
    }
}


module.exports = deleteProductController;
