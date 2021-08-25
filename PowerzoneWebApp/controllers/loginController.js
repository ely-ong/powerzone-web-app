const db = require('../models/db.js');

const User = require('../models/PersonnelModel.js');

const loginController = {

    getLogIn: function (req, res) {
        if(req.session.role)
            res.render('home');
        res.render('login');
    },

    postLogIn: function (req, res) {

        // Ask if anong details need for the login page
        var username = req.body.username;
        var pass = req.body.password;

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
                req.session.username = result.username;
                req.session.role = result.role;
            
                res.render('home');
            }

            // User not in database
            else {
                var details = {error: `Incorrect username or password.`}
                res.render('login', details);
            }
        });
    }
}


module.exports = loginController;
