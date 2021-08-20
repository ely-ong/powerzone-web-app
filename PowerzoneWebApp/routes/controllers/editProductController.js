const db = require('../models/db.js');

const User = require('../models/PersonnelModel.js');

const editProductController = {

    getEditProduct: function (req, res) {
        res.render('editProduct');
    },
}


module.exports = editProductController;
