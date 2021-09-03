const db = require('../models/db.js');

const Product = require('../models/ProductModel.js');

const mongoose = require('mongoose');

const deleteProductController = {

    getDeleteProduct: function (req, res) {

        if(req.session.role == "Administrator"  || req.session.role == "Depot General Manager") {
            db.deleteOne(Product, {productId: req.query.productId});
        }
        res.redirect('/products');
    }
}


module.exports = deleteProductController;
