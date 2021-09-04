const db = require('../models/db.js');

const User = require('../models/PersonnelModel.js');

const navBarController = {

    displayAccounts: function (req, res) {

    	if(req.session.role != "Administrator" && req.session.role != "Depot General Manager"){
            if(req.session.role == "Depot Supervisor" || 
                req.session.role == "Depot Cashier" ||
                req.session.role == "Regular User") {

                    var details = {error: `User is unauthorized to access the page. Please log in with an authorized account.`}
                    req.session.destroy(function(err){
                    if(err) throw err;
                    else console.log('Logout Successful.');

                });
            }
            else
                var details = {error: `User is not logged in. Please log in first.`}

            res.render('login', details);
        }

    	db.findMany(User, {}, '', function (result) {
		    if(result) {
		    	personsArray = result;

		        res.render('accounts', {personsArray});
		    }
		});
    },

    getSearchAccounts: function(req,res){
        var searchText = req.query.search_accnt;

        console.log(searchText);

        db.findMany(User, {username: {$regex: ".*" + searchText + ".*", $options: 'i'}}, '', function(result){
              if(result) {
                var personsArray = result;

                res.render('accounts', {personsArray});
            }  
        })
    },
}


module.exports = navBarController;
