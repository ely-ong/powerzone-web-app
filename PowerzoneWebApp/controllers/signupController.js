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

        var username = req.body.username;
        var pass = req.body.password;

        // bcrypt.hash(pw, saltRounds, function(err, hash) {

            var user = {
                username: username,
                pass: pass
            }

            db.insertOne(User, user, function(flag) {
                if(flag) {
                    console.log('HERE');
                    res.redirect('success');
                }
            });
        // });
    },

    checkUsername: function(req, res){
        var username = req.query.username;
        db.findOne(User, {username: username}, '', function(result){
                if(result != null){
                    res.send(result);
                }
                else
                    res.send(null);
            });
    }
}


module.exports = signupController;
