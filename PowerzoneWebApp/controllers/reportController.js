const db = require('../models/db.js');

const User = require('../models/PersonnelModel.js');

const reportController = {

	/**
     * This function displays the report page following a get request from a user. This function also checks the role of the 
     * currently logged in user and directs them to the report page if the appropriate role is used to access the page. 
     * This function restricts the access of users not logged in to an existing account as well.
     *
     * @param req the object containing the HTTP request to access the report page
     * @param res the object to send back the appropriate HTTP response to either allow or reject user access to the report page
     */
    getReport: function (req, res) {

    	// This conditional statement checks if the user is authorized to access the report page
    	if(req.session.role != "Administrator" && req.session.role != "Depot Supervisor" && req.session.role != "Depot Cashier" 
    		&& req.session.role != "Depot General Manager") {
	            
            // Regular users are not allowed access to the page and will be redirected to the login page
            if(req.session.role == "Regular User") {
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

            // Loads the login page with the appropriate error message
            res.render('login', details);
        }
        // Displays the report page if the logged-in account is authorized
        else
        	res.render('report');
    },
}


module.exports = reportController;
