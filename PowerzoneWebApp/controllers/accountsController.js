// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/PersonnelModel.js`
const User = require('../models/PersonnelModel.js');

const navBarController = {

    /**
     * This function displays the add account page following a get request from a user. This function also checks the role of the 
     * currently logged in user and directs them to the accounts page if the appropriate role is used to access the page. 
     * This function restricts the access of users not logged in to an existing account as well.
     *
     * @param req the object containing the HTTP request to access the accounts page
     * @param res the object to send back the appropriate HTTP response to either allow or reject user access to the accounts page
     */
    displayAccounts: function (req, res) {

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
        // Loads the data of all the users, if the logged-in account is authorized, and renders the accounts page
        else{
        	db.findMany(User, {}, '', function (result) {
    		    if(result) {
    		    	personsArray = result;

    		        res.render('accounts', {personsArray});
    		    }
    		});
        }
    },

    /**
     * This function performs substring search on the database and filters the results based on the inputted search query of the user.
     * The results will be displayed with the most recently created user at the top of the list.
     *
     * @param req the object containing the HTTP request to perform substring search on the user accounts saved in the database
     * @param res the object to send the HTTP response to display the accounts page with the queried list of users
     */
    getSearchAccounts: function(req,res) {

        // obtains the query from the get request
        var searchText = req.query.search_accnt;

        db.findMany(User, {username: {$regex: ".*" + searchText + ".*", $options: 'i'}}, '', function(result) {
              if(result) {
                var personsArray = result;

                res.render('accounts', {personsArray});
            }  
        })
    },
}


module.exports = navBarController;
