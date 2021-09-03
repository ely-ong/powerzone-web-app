const db = require('../models/db.js');

const User = require('../models/PersonnelModel.js');

const navBarController = {

    displayAccounts: function (req, res) {

    	db.findMany(User, {}, '', function (result) {
		    if(result) {
		    	personsArray = result;

		        res.render('accounts', {personsArray});
		    }
		});
    },
}


module.exports = navBarController;
