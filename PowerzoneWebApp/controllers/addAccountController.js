// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/PersonnelModel.js`
const User = require('../models/PersonnelModel.js');

// import module uniqid
const uniqid = require('uniqid');

const addAccountController = {

    /**
     * This function displays the add account page following a get request from a user. This function also checks the role of the 
     * currently logged in user and directs them to the add account page if the appropriate role is used to access the page. 
     * This function restricts the access of users not logged in to an existing account as well.
     *
     * @param req the object containing the HTTP request to access the add account page
     * @param res the object to send back the appropriate HTTP response to either allow or reject user access to the add account page
     */
    getAddAccount: function(req, res) {

        // This conditional statement checks if the user is not an Administrator nor a Depot General Manager (i.e., unauthorized account)
        if(req.session.role != "Administrator" && req.session.role != "Depot General Manager") {

            /** 
             * This conditional statement checks if the user is logged in and does not have the authorized role to access the page.
             * In the event of unauthorized access, user will be logged out of the session and will be asked to log in with an
             * authorized account instead.
             */
            if(req.session.role == "Depot Supervisor" || req.session.role == "Depot Cashier" || req.session.role == "Regular User") {
                    var details = {error: `User is unauthorized to access the page. Please log in with an authorized account.`}
                    
                    req.session.destroy(function(err) {
                        if(err) 
                            throw err;
                        else 
                            console.log('Logout Successful.');
                });
            }
            // Loads an error message to ask the user to log in before trying to access any page of the website
            else
                var details = {error: `User is not logged in. Please log in first.`}

            // Re-loads the login page with the appropriate error message
            res.render('login', details);
        }
        // Displays the add account page if the logged-in account is authorized
        else
    	   res.render('addAccount');
    },

    /**
     * This function adds a new user to the database following a post request from an authorized user
     *
     * @param req the object containing the HTTP request to add an account with the received details in the HTML input fields
     * @param res the object to send back the appropriate HTTP response to display a success or fail page after the post request
     */
    postAddAccount: function(req, res) {

        // Obtains the necessary information from the post request for user details
    	var username = req.body.username;
    	var role = req.body.role;
    	var password = req.body.password;
    	var userId = uniqid('user-');

        // Creates a user object to add to the database based on the post request details
    	var user = {
            username: username,
            pass: password,
            role: role,
            userId: userId
        }

        // Adds the user and all indicated details to the database; renders the appropariate page based on the success of the operation
        db.insertOne(User, user, function(flag) {
            if(flag) 
                res.render('addAccntSuccess');
            else
            	res.render('addAccntFail');
        });
    }
}


module.exports = addAccountController;
