// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/PersonnelModel.js`
const User = require('../models/PersonnelModel.js');

const logoutController = {

	/**
     * This function submits a get request to log out of an account and terminate the existing session
     *
     * @param req the object containing the HTTP request to log out of a session
     * @param res the object to send back the appropriate HTTP response to end the session end redirect the user to the login page
     */
    getLogOut: function (req, res) {

    	// Terminates the current session and redirects the user to the login page
        req.session.destroy(function(err){
			if(err) 
				throw err;
			else 
				console.log('Logout Successful.');

			res.render('login');
		});
    },
}


module.exports = logoutController;
