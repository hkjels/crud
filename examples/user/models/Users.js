
/**
 * Module dependencies
 */

var mongoose = require('mongoose')
  , Schema = mongoose.Schema

/**
 * UserModel
 *
 * Will be passed to Crud for dissection. Crud will then normalize and simplify
 * the JSON-object to something fairly human-friendly.
 */

var Users = new Schema({
    'added': {type: Date, 'default': Date.now, ignore: true}
  , 'name': {
        'first': {type: String, required: true}
      , 'last': String
    }
  , 'email': {
        'home': {type: String, match: /[\w]+@[\w]+\.[\w]{2,3}/, required: true}
      , 'work': {type: String}
    }
  , 'phone': {type: String, match: /[\d]{8}/, override: 'tlf'}
  , 'born': Date
  , 'about': {type: String, min: 80}
})

/**
 * Expose User to mongoose
 */

mongoose.model('Users', Users)

