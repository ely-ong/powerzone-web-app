const successController = {


    getSuccess: function (req, res) {

        var details = {
            firstName: req.query.firstName,
            lastName: req.query.lastName,
            idNumber: req.query.idNumber,
            role: req.query.role
        };

        res.render('success', details);
    }

}

module.exports = successController;
