const db = require('../models/db.js');

const User = require('../models/PersonnelModel.js');

const reportController = {

    getReport: function (req, res) {
        res.render('report');
    },
}


module.exports = reportController;
