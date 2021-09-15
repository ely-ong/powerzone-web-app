
// import module `bcrypt`
const bcrypt = require('bcrypt');
const saltRounds = 10;

// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `Personnel` as User from `../models/PersonnelModel.js`
const User = require('../models/PersonnelModel.js');

const signupController = {

    /**
     * This function loads the signup page wherein an authorized account can create new accounts for new employees
     *
     * @param req the object containing the HTTP request to access the signup page
     * @param res the object to send back the HTTP response to redirect the user to the signup page
     */
    getSignUp: function (req, res) {
        res.render('signup');
    },

    /**
     * This function submits the details that an authorized account submits to create a new account for a new employee
     *
     * @param req the object containing the HTTP request to create an account
     * @param res the object to send back the HTTP response to redirect the user to a success page once account creation is complete
     */
    postSignUp: function (req, res) {

        // Obtains the information from the input fields
        var username = req.body.username;
        var pass = req.body.password;

            // Create a user object to insert into the database
            var user = {
                username: username,
                pass: pass
            }

            // Inserts the new user to the database
            db.insertOne(User, user, function(flag) {
                if(flag) {
                    console.log('HERE');
                    res.redirect('success');
                }
            });
    },

    /**
     * This is a helper function to assist the front-end validation of an already-existing username in the database
     *
     * @param req the object containing the HTTP request to check the username for matches in the database
     * @param res the object to send back the HTTP response of an object containing a match or a null value based on the operation
     */
    checkUsername: function(req, res){

        // Obtains the username from the input field
        var username = req.query.username;

        // Finds for a matching user with the same username in the database and returns the user's details if a match is found
        db.findOne(User, {username: username}, '', function(result) {
                if(result != null){
                    res.send(result);
                }
                else
                    res.send(null);
            });
    }
}


module.exports = signupController;
