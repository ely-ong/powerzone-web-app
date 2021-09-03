const db = require('../models/db.js');

const Product = require('../models/ProductModel.js');

const navBarController = {

    getAccounts: function (req, res) {

    	res.redirect('/displayAccounts');
    },

    getEditAccount: function(req, res){

    	res.render('editAccount');
    }
}


module.exports = navBarController;
