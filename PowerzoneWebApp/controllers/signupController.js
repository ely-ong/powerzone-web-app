// Ask if want ni client mag implement ng id number for additional verification pati identification
// Implement password hashing

// import module `bcrypt`
const bcrypt = require('bcrypt');
const saltRounds = 10;

// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `Personnel` from `../models/PersonnelModel.js`
const User = require('../models/PersonnelModel.js');

const signupController = {

    getSignUp: function (req, res) {
        res.render('signup');
    },

    postSignUp: function (req, res) {

        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var idNumber = req.body.idNumber;
        var role = req.body.role;
        var pass = req.body.pass;

        bcrypt.hash(pw, saltRounds, function(err, hash) {

            var user = {
                firstName: firstName,
                lastName: lastName,
                idNumber: idNumber,
                role: role,
                isApproved: false
            }

            db.insertOne(User, user, function(flag) {
                if(flag) {
                    res.redirect('/success?firstName=' + firstName +'&lastName=' + lastName + '&idNumber=' + idNumber);
                }
            });
        });
    }
}


module.exports = signupController;
