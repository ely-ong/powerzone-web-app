const db = require('../models/db.js');

const Product = require('../models/ProductModel.js');

const mongoose = require('mongoose');

const deleteProductController = {

    getDeleteProduct: function (req, res) {

        var id = req.query.delete_button;

        console.log(id);

        res.render('confirmCode', {u: {
            id: id
        }});
    },

    confirmDelete: function (req, res) {

        var prodId = req.body.product_id_holder;
        console.log("ID " + prodId);

        if(req.body.confirm_code == "password"){
            
            db.deleteOne(Product, {productId: prodId});
            
        }
        
        res.redirect('/products');
    }
}


module.exports = deleteProductController;
