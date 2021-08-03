const db = require('../models/db.js');

const User = require('../models/PersonnelModel.js');

const loginController = {

    getLogIn: function (req, res) {
        res.render('login');
    },

    postLogIn: function (req, res) {

        // Ask if anong details need for the login page
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var idNumber = req.body.idNumber;
        var pass = req.body.pass;

        db.findOne(User, {idNumber: idNumber}, '', function (result) {
        if(result) {
            bcrypt.compare(pass, result.pass, function(err, equal) {
                // Go to inventory app home page if password matches
                if(equal)
                    res.render('home');
                // Return to login page if password does not match
                else {
                    res.render('login');
                }
            });
        }

        // User not in database
        else {
            res.render('login');
        }
    });
    }
}


module.exports = loginController;
