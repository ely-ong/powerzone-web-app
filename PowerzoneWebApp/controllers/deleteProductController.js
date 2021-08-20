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

        console.log(req.body.confirm_code);

        if(req.body.confirm_code == "password"){
            
            db.deleteOne(Product, );
        }
        else{
            res.redirect('/products');
        }
    }
}


module.exports = deleteProductController;
