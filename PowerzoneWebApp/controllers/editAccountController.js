// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/PersonnelModel.js`
const User = require('../models/PersonnelModel.js');

const editAccountController = {

    /**
     * This function displays the edit account page following a get request from a user. This function also checks the role of the 
     * currently logged in user and directs them to the edit account page if the appropriate role is used to access the page. 
     *
     * @param req the object containing the HTTP request to access the edit account page
     * @param res the object to send back the appropriate HTTP response to either allow or reject user access to the edit account page
     */
    getEditAccount: function(req, res) {

        // Obtains the the unique id of the account to be edited from the HTML page
        var uniqueId = req.query.edit_button;
        var isAllowed = false;

        // Sets editing permission for the Administrator and Depot General Manager roles
        if(req.session.role == "Administrator" || req.session.role == "Depot General Manager")
            isAllowed = true;

        // Finds the user from the database using the unique id obtained from the get request and loads the edit account page
        db.findOne(User, {userId: uniqueId}, '', function (result) {
            if(result) {
                res.render('editAccount', {result: {
                    username: result.username,
                    role: result.role,
                    userId: result.userId,
                    isAllowed: isAllowed
                }});
            }
            // Loads an error page if the user is not in the database
            else 
                res.render('error');
            
        });
    },

    /**
     * This function edits an existing user's details from the database following a get request from a user.
     *
     * @param req the object containing the HTTP request to edit a user's details in the database
     * @param res the object to send back the HTTP response to edit the indicated details after a get request
     */
    submitEditAccount: function(req, res) {

        // Obtains the necessary information from the get request
        var uniqueId = req.query.submit_button;
        var username = req.query.username;
        var role = req.query.role;
        var password = req.query.password;
        var changedDepotManager = false;

        // Checks if the currently logged-in user was a Depot General Manager but demoted the account role to a lower level account
        if(req.query.role == undefined)
            role = req.session.role;
        else {
            if(req.session.role == "Depot General Manager" && (req.session.username == req.query.username && 
                req.session.role != req.query.role))
                
                changedDepotManager = true;
        }

        // Checks if the password field was left blank meaning the previous password will still be used by the account
        if(password.length == 0) {

            // Finds the existing password of the user being edited
            db.findOne(User, {userId: uniqueId}, '', function (result) {
                if(result) {
                    password = result.pass;

                    db.updateOne(User, {userId: uniqueId}, {$set: {
                        username: username,
                        pass: password,
                        role: role
                    }}, function(result2) {

                        // Redirects the user to the accounts page if the logged-in role is An administrator
                        if(req.session.role == "Administrator")
                            res.redirect('/displayAccounts');
                        else if(req.session.role == "Depot General Manager") {
                            
                            // Ends the session and laods the log-in page if the account was demoted from a Depot General Manager
                            if(changedDepotManager)
                                res.redirect('/logout');

                            // Redirects the user to the accounts page if the logged-in role is still a Depot General Manager
                            else
                                res.redirect('/displayAccounts');
                        }
                        // Redirects the user to the home page if the logged-in role is an unauthorized to view the accounts page
                        else
                            res.redirect('/home');
                    });
                }
            });
        }
        // Updates the user details with the new password
        else {
            db.updateOne(User, {userId: uniqueId}, {$set: {
                username: username,
                pass: password,
                role: role
            }}, function(result2) {

                // Redirects the user to the accounts page if the logged-in role is an Administrator
                if(req.session.role == "Administrator")
                    res.redirect('/displayAccounts');

                else if(req.session.role == "Depot General Manager") {
                    
                    // Ends the session and laods the log-in page if the account was demoted from a Depot General Manager
                    if(changedDepotManager)
                        res.redirect('/logout');

                    // Redirects the user to the accounts page if the logged-in role is still a Depot General Manager
                    else
                        res.redirect('/displayAccounts');
                }
                // Redirects the user to the home page if the logged-in role is an unauthorized to view the accounts page
                else
                    res.redirect('/home');
            });
        }

        
    },

    /**
     * This function deletes an existing account from the database following a get request from an authorized user.
     *
     * @param req the object containing the HTTP request to delete an account from the database
     * @param res the object to send back the HTTP response to delete an account after a get request
     */
    deleteAccount: function(req, res) {

        // Obtains from the HTML page the unique id of the account to be deleted
        var uniqueId = req.query.userId;

        // Deletes the user from the database
        db.deleteOne(User, {userId: uniqueId});

        // Checks if the deleted account is the currently logged-in user
        if(req.session.userId == uniqueId)
            res.send(true);
    },

    /**
     * This function redirects the user to a certain page based on their role after a get request to cancel user edits.
     *
     * @param req the object containing the HTTP request to cancel editing an account
     * @param res the object to send back the HTTP response to cancel editing an account after a get request
     */
    cancel: function(req, res) {

        // Checks if the logged-in account is either an Administrator and Depot General Manager and redirects them to the accounts page
        if(req.session.role == "Administrator" || req.session.role == "Depot General Manager")
            res.redirect('/displayAccounts');

        // Redirects other account roles to the home page
        else
            res.redirect('/home');
    },

    /**
     * This is a helper function to obtain the original username from the username input field of the edit account page.
     *
     * @param req the object containing the HTTP request to obtain the original username of the account being edited
     * @param res the object to send back the HTTP response to cancel editing an account after a get request
     */
    getEditUsername: function(req, res) {

        // Obtains the original username of the account being edited
        var og_username = req.query.og_username;

        // Finds the user from the database and returns the needed information
        db.findOne(User, {username: og_username}, '', function (result) {
            if(result)           
                res.send(result.username);
            else
                res.send(null);
        });
    }
}


module.exports = editAccountController;
