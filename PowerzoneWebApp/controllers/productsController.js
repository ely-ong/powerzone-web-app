const db = require('../models/db.js');

const User = require('../models/PersonnelModel.js');

const productsController = {

    getProducts: function (req, res) {
        res.render('product');
    },
}


module.exports = productsController;
