const db = require('../models/db.js');

const User = require('../models/PersonnelModel.js');

const homeController = {

    getHome: function (req, res) {
        if(req.session.role != "Administrator" && req.session.role != "Depot Supervisor" 
            && req.session.role != "Depot Cashier" && req.session.role != "Regular User" && req.session.role != "Depot General Manager") {

            var details = {error: `User is not logged in. Please log in first.`}

            res.render('login', details);
        }
        res.render('home');
    },

    getAccountRole: function(req, res) {
    	if(req.session.role)
    		res.send(req.session.role);
    	else{
    		res.send(null)
    		console.log("Session error");
    	}
    },

    getAccountUsername: function(req, res) {
        if(req.session.username)
            res.send(req.session.username);
        else{
            res.send(null)
            console.log("Session error");
        }
    }
}


module.exports = homeController;
