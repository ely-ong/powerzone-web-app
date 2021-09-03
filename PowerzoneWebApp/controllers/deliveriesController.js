const db = require('../models/db.js');

const User = require('../models/PersonnelModel.js');

const deliveriesController = {

    getDeliveries: function (req, res) {
    	if(req.session.role != "Administrator" && req.session.role != "Depot Supervisor" && 
    		req.session.role != "Depot Cashier" && req.session.role != "Regular User" && 
    		req.session.role != "Depot General Manager") {

	        var details = {error: `User is not logged in. Please log in first.`}

            res.render('login', details);
        }
        res.render('deliveries');
    },
}


module.exports = deliveriesController;
