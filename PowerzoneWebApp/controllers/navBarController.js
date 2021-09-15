// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/PersonnelModel.js`
const User = require('../models/PersonnelModel.js');

const navBarController = {

    /**
     * This function redirects to the displayAccounts function in the accountsController.js
     *
     * @param req the object containing the HTTP request to access the accounts page
     * @param res the object to send back the appropriate HTTP response to redirect the user to the displayAccounts function
     */
    getAccounts: function (req, res) {
    	res.redirect('/displayAccounts');
    },

    /**
     * This function displays the edit account page following a get request from a user. This function also checks the role of the 
     * currently logged in user and directs them to the edit account page if the appropriate role is used to access the page. 
     *
     * @param req the object containing the HTTP request to access the edit account page
     * @param res the object to send back the appropriate HTTP response to either allow or reject user access to the edit account page
     */
    getEditAccount: function(req, res){

        // Obtains the the unique id of the account to be edited from the HTML page
    	var userId = req.session.userId;
        var isAllowed = false;

        // Sets editing permission for the Administrator and Depot General Manager roles
        if(req.session.role == "Administrator" || req.session.role == "Depot General Manager")
            isAllowed = true;
        
        // Finds the user from the database using the unique id obtained from the get request and loads the edit account page
    	db.findOne(User, {userId: userId}, '', function (result) {
            if(result) {
                res.render('editAccount', {result: {
                    username: result.username,
                    role: result.role,
                    userId: result.userId,
                    isAllowed: isAllowed
                }});
            }
        });
    }
}


module.exports = navBarController;
