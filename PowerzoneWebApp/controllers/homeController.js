// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/PersonnelModel.js`
const User = require('../models/PersonnelModel.js');

const homeController = {

    /**
     * This function displays the home page following a get request from a user. This function also checks if the user is currently 
     * logged in and directs them to the home page once verified. 
     *
     * @param req the object containing the HTTP request to access the home page
     * @param res the object to send back the appropriate HTTP response to either allow or reject user access to the home page
     */
    getHome: function (req, res) {

        // Checks if the user is logged in to a Powerzone account
        if(req.session.role != "Administrator" && req.session.role != "Depot Supervisor" && req.session.role != "Depot Cashier" && 
            req.session.role != "Regular User" && req.session.role != "Depot General Manager") {

            var details = {error: `User is not logged in. Please log in first.`}

            res.render('login', details);
        }
        else
            res.render('home');
    },

    /**
     * This is a helper function to obtain the role of the currently logged in user.
     *
     * @param req the object containing the HTTP request to obtain the role of the logged-in user for the session
     * @param res the object to send back the appropriate HTTP response containing the role of the logged-in user
     */
    getAccountRole: function(req, res) {

        // Forwards the role of the current session if it exists
    	if(req.session.role)
    		res.send(req.session.role);
    	else
    		res.send(null)
    },

    /**
     * This is a helper function to obtain the username of the currently logged in user.
     *
     * @param req the object containing the HTTP request to obtain the username of the logged-in user for the session
     * @param res the object to send back the appropriate HTTP response containing the username of the logged-in user
     */
    getAccountUsername: function(req, res) {

        // Forwards the username of the current session if it exists
        if(req.session.username)
            res.send(req.session.username);
        else
            res.send(null)
    }
}


module.exports = homeController;
