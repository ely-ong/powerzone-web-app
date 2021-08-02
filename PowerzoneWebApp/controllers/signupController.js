//ask if want ni client mag implement ng id number for additional verification pati identification
//implement password hashing

const db = require('../models/db.js');

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
        var isApproved = false;

        var user = {
            firstName: firstName,
            lastName: lastName,
            idNumber: idNumber,
            role: role,
            isApproved: isApproved,

        }

        db.insertOne(User, user, function(flag) {
            if(flag) {
                res.redirect('/success?firstName=' + firstName +'&lastName=' + lastName + '&idNumber=' + idNumber);
            }
        });
    }
}


module.exports = signupController;
