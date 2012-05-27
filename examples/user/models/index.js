
/**
 * Module dependencies
 */

var mongoose = require('mongoose')

/**
 * Connect to MongoDb
 */

mongoose.connect('mongodb://localhost/crud')

/**
 * UserModel
 */

require('./Users')

