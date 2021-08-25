const db = require('../models/db.js');

const User = require('../models/PersonnelModel.js');

const reportController = {

    getReport: function (req, res) {
    	if(req.session.role != "Administrator" &&
    		req.session.role != "Depot Supervisor" && 
            req.session.role != "Depot Cashier"){
	            if(req.session.role == "User") {

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
        res.render('report');
    },
}


module.exports = reportController;
