var mongoose = require('mongoose');

// defines the schema for collection `personnel`
var PersonnelSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
});

/*
*    Exports a mongoose.model object based on `PersonnelSchema`when another script exports from this file
*    This model executes CRUD operations to collection `user`
*/
module.exports = mongoose.model('user', PersonnelSchema);
