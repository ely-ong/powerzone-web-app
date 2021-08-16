const db = require('../models/db.js');

const User = require('../models/PersonnelModel.js');

const logoutController = {

    getLogOut: function (req, res) {
        res.render('login');
    },
}


module.exports = logoutController;
