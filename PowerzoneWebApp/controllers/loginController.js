// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/PersonnelModel.js`
const User = require('../models/PersonnelModel.js');

const loginController = {

    /**
     * This function redirects a currently logged-in user to the home page if they attempt to access the log-in page without logging 
     * out of the ongoing session
     *
     * @param req the object containing the HTTP request to access the login page
     * @param res the object to send back the appropriate HTTP response to redirect the user to the appropriate page
     */
    getLogIn: function (req, res) {

        // Redirects a user attempting to access the login page to the home page if session exists
        if(req.session.role)
            res.render('home');
        else
            res.render('login');
    },

    /**
     * This function submits a post request of a user's login credentials to access the Powerzone Web App page
     *
     * @param req the object containing the HTTP request to login to an existing account
     * @param res the object to send back the appropriate HTTP response to allow or reject user access to the application
     */
    postLogIn: function (req, res) {

        // Obtain the username and password values from the login input fields
        var username = req.body.username;
        var pass = req.body.password;

        // Finds a user in the database that matches the submitted credentials
        db.findOne(User, {username: username, pass: pass}, '', function (result) {
            if(result) {
                // bcrypt.compare(pass, result.pass, function(err, equal) {
                //     // Go to inventory app home page if password matches
                //     if(equal)
                //         res.render('home');
                //     // Return to login page if password does not match
                //     else {
                //         res.render('login');
                //     }
                // });

                // Sets the session details after user successfully logs into an existing account
                req.session.username = result.username;
                req.session.role = result.role;
                req.session.userId = result.userId;
            
                var role = {role: req.session.role}

                // Loads the home page of the application
                res.render('home', role);
            }

            // Returns the user to the login page if the credentials do not match any existing user
            else {
                var details = {error: `Incorrect username or password.`}

                // Loads the login page with the appropriate error message
                res.render('login', details);
            }
        });
    }
}


module.exports = loginController;
