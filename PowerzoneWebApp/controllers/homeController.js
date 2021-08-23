const db = require('../models/db.js');

const User = require('../models/PersonnelModel.js');

const homeController = {

    getHome: function (req, res) {
        res.render('home');
    },

    getAccountRole: function(req, res) {
    	if(req.session.role)
    		res.send(req.session.role);
    	else{
    		res.send(null)
    		console.log("Session error");
    	}
    }
}


module.exports = homeController;
