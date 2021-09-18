// import module mongoose
const mongoose = require('mongoose');

// import module `user` from `./PersonnelModel.js`
const user = require('./PersonnelModel.js');

// set the reference to the online database
const url = 'mongodb+srv://PowerzoneAdmin:SnowYukiNalu@powerzonedb.zucj5.mongodb.net/Database?retryWrites=true&w=majority';

// initialize the options for the database
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};

const database = {

    // This function connects the application to the database using the indicated url.
    connect: function() {
        mongoose.connect(url, options, function(error) {
            if(error) 
                throw error;

            console.log('Connected to: ' + url);
        });
    },


    /*
     * This function inserts one document to the database.
     * 
     * @param model the object containing the collection to be used for the operation
     * @param doc the object containing the document to be inserted into the specified collection
     * @param callback the object containing a function to be executed after the database operation
     */
    insertOne: function(model, doc, callback) {
        model.create(doc, function(error, result) {
            if(error){ 
                console.log(error);
                return callback(false);
            }

            console.log('Added ' + result);
            return callback(true);
        });
    },


    /*
     * This function creates and inserts many documents to the database.
     * 
     * @param model the object containing the collection to be used for the operation
     * @param docs the object containing the documents to be inserted into the specified collection
     */
    insertMany: function(model, docs) {
        model.insertMany(docs, function(error, result) {
            if(error) 
                return callback(false);

            console.log('Added ' + result);
            return callback(true);
        });
    },


    /*
     * This function finds a single document from the database using the supplied query.
     * 
     * @param model the object containing the collection to be used for the operation
     * @param query the object containing the searching criteria for the document to be found
     * @param projection the object containing the specific properties to be obtained from the retrieved document
     * @param callback the object containing a function to be executed after the database operation
     */
    findOne: function(model, query, projection, callback) {
        model.findOne(query, projection, function(error, result) {
            if(error) 
                return callback(false);

            return callback(result);
        });
    },


    /*
     * This function finds multiple documents from the database using the supplied query.
     * 
     * @param model the object containing the collection to be used for the operation
     * @param query the object containing the searching criteria for the documents to be found
     * @param projection the object containing the specific properties to be obtained from the retrieved documents
     * @param callback the object containing a function to be executed after the database operation
     */
    findMany: function(model, query, projection, callback) {
        model.find(query, projection, function(error, result) {
            if(error) 
                return callback(false);

            return callback(result);
        });
    },


    /*
     * This function finds multiple documents from the database using the supplied query and sorts these using the given 
     * sorting criteria.
     * 
     * @param model the object containing the collection to be used for the operation
     * @param query the object containing the searching criteria for the documents to be found
     * @param sort_criteria the object containing the sorting criteria to which the documents will be arranged by
     * @param callback the object containing a function to be executed after the database operation
     */
    findManyAndSort: function(model, query, sort_criteria, callback) {
        model.find(query).sort(sort_criteria).exec((error, result) => {
            if(error) 
                return callback(false);

            return callback(result);
        });
    },


    /*
     * This function finds a single document from the database and updates its details using the supplied update object.
     * 
     * @param model the object containing the collection to be used for the operation
     * @param filter the object containing the searching criteria for the document to be found
     * @param update the object containing the properties and values to be changed in the retrieved document
     * @param callback the object containing a function to be executed after the database operation
     */
    updateOne: function(model, filter, update, callback) {
        model.updateOne(filter, update, function(error, result) {
            if(error) 
                throw error;

            console.log('Document modified: ' + result.nModified);
            return callback(true);
        });
    },


    /*
     * This function finds multiple documents from the database and updates their details using the supplied update object.
     * 
     * @param model the object containing the collection to be used for the operation
     * @param filter the object containing the searching criteria for the documents to be found
     * @param update the object containing the properties and values to be changed in the retrieved documents
     */
    updateMany: function(model, filter, update, callback) {
        model.updateMany(filter, update, function(error, result) {
            if(error) 
                return callback(false);

            console.log('Documents modified: ' + result.nModified);
            return callback(true);
        });
    },


    /*
     * This function finds a single document from the database and deletes it.
     * 
     * @param model the object containing the collection to be used for the operation
     * @param conditions the object containing the searching criteria for the document to be deleted
     */
    deleteOne: function(model, conditions) {
        model.deleteOne(conditions, function (error, result) {
            if(error) 
                throw error;

            console.log('Document deleted: ' + result.deletedCount);
        });
    },


    /*
     * This function finds multiple documents from the database and deletes them.
     * 
     * @param model the object containing the collection to be used for the operation
     * @param conditions the object containing the searching criteria for the documents to be deleted
     */
    deleteMany: function(model, conditions) {
        model.deleteMany(conditions, function (error, result) {
            if(error) 
                return callback(false);

            console.log('Document deleted: ' + result.deletedCount);
            return callback(true);
        });
    }

}

module.exports = database;
