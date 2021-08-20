const db = require('../models/db.js');

const User = require('../models/PersonnelModel.js');

const deliveriesController = {

    getDeliveries: function (req, res) {
        res.render('deliveries');
    },
}


module.exports = deliveriesController;
