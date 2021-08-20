const db = require('../models/db.js');

const User = require('../models/PersonnelModel.js');

const addProductController = {

    getAddProduct: function (req, res) {
        res.render('addProduct');
    },
}


module.exports = addProductController;
