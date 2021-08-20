var mongoose = require('mongoose');

// defines the schema for collection `personnel`
var PersonnelSchema = new mongoose.Schema({
    // firstName: {
    //     type: String,
    //     required: true
    // },
    // lastName: {
    //     type: String,
    //     required: true
    // },
    username: {
        type: String,
        required: true
    },
    // role: {
    //     type: Number,
    //     required: true
    // },
    pass: {
        type: String,
        required: true
    },
    // isApproved: {
    //     type: Boolean,
    //     required: true
    // }
});

/*
*    Exports a mongoose.model object based on `PersonnelSchema`when another script exports from this file
*    This model executes CRUD operations to collection `personnel`
*/
module.exports = mongoose.model('user', PersonnelSchema);
