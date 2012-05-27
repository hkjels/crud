
/*!
 * Crud
 * Copyright (c) Henrik Kjelsberg 2012 <henrik@kjelsberg.net>
 * MIT licensed
 */

/**
 * Module dependencies
 */

var cycle = require('cycle')
  , lingo = require('lingo')
  , en = lingo.en
  , mongoose = require('mongoose')

/**
 * Form
 *
 * Normalizes a mongoose Schema to be used with a form-template
 * @param {Mixed} model     Model or name of a model
 * @param {Function} cb     Callback
 */

var form = exports.form = function (model, cb) {
  var err = false
    , form = {}
    , Model
    , Schema
    , copy = {
        'isRequired': 'required'
    }

  /**
   * Retrieve model from mongoose
   */

  try {
    Model = typeof model === 'string' ? mongoose.model(model) : model
    Schema = cycle.decycle(Model.prototype._schema.paths)
  }

  /**
   * Incorrect modelname or faulty model
   */

  catch (err) {
    return cb(err)
  }

  /**
   * Process Schema
   *
   * Normalization of the Schema-model to a more humanfriendly JSON format
   */

  for (var field in Schema) {

    /**
     * Ignored fields
     */

    for (var prop in Schema[field]) {
      if (prop === 'selected' && !field[prop]) continue
    }

    form[field] = {}

    /**
     * Copy a bunch of parameters
     *
     * The value from the copy-object is used as the key to our new form-object
     * TODO Need a smarter way of pushing values from Schema to form
     */

    for (var key in copy) {
      if (typeof Schema[field][key] !== 'undefined') {
        form[field][copy[key]] = Schema[field][key]
      }
    }

    /**
     * Field name
     */

    form[field]['name'] = field.substring(field.lastIndexOf('.') + 1)

    /**
     * Field type
     */

    var fieldtype = field.match(/(number|date|email|password|url|tlf)/gi) || 'text'
    form[field]['type'] = Schema[field].instance === 'boolean' ? 'checkbox' : fieldtype
    form[field]['type'] = typeof Schema[field]['options']['override'] !== 'undefined'
                        ? Schema[field]['options']['override']
                        : fieldtype
    form[field]['type'] = form[field]['type'].toString()
    form[field]['type'] = field[0] === '_' ? 'hidden' : form[field]['type']
    if (typeof Schema[field]['options']['min'] !== 'undefined'
        && Schema[field]['options']['min'] >= 50) {
      form[field]['type'] = 'textarea'
    }
    if (typeof Schema[field]['options']['max'] !== 'undefined') {
      form[field]['max'] = Schema[field]['options']['max']
    }
  }

  return cb(err, form)
}

/**
 * Resource for use with express-resources
 */

exports.resource = {
    index: function (req, res) {}

  , new: function (req, res, next) {
      var instance = 'user'
        , model = lingo.capitalize(en.pluralize(instance))

      console.log(req.route)

      form(model, function (err, form) {
        if (err) return next(err)
        res.locals({
            form: form
          , instance: instance
          , model: model
        })
        res.render('form')
      })
    }

  /**
   * Create
   */

  , create: function (req, res) {}

  /**
   * ≈Read
   */

  , show: function (req, res) {}

  /**
   * Edit
   *
   * Normalizes mongoose-model. The normalized data is found in the local named
   * "form" and can easily be converted into a bunch of form-elements with some
   * clever templating.
   * @see /examples
   */

  , edit: function (req, res, next) {
      var instance = Object.keys(req.route.params)[0]
        , model = lingo.capitalize(en.pluralize(instance))

      form(model, function (err, form) {
        if (err) return next(err)
        res.locals({
            form: form
          , instance: instance
          , model: model
        })
        res.render('form')
      })
    }

  /**
   * Update
   */

  , update: function (req, res) {}

  /**
   * Delete
   */

  , destroy: function (req, res) {}


}

/**
 * Crud express-middleware
 *
 * A middleware route for express that populates res.form with the fields from
 * the specified model.
 */

exports.middleware = function (req, res, next) {
  var instance = req.params.model.toLowerCase()
    , model = lingo.capitalize(en.pluralize(instance))
  form(model, function (err, form) {
    if (err) return next(err)
    res.locals({
        form: form
      , instance: instance
      , model: model
    })
    return next()
  })
}

