
/*!
 * Crud
 * Copyright (c) Henrik Kjelsberg 2012 <henrik@kjelsberg.net>
 * MIT licensed
 */

/**
 * Module dependencies
 */

var mongoose = require('mongoose')
  , cycle = require('cycle')

/**
 * Form
 *
 * Normalizes a mongoose Schema to be used with a form-template
 * @param {Mixed} model     Model or name of a model
 * @param {Function} cb     Callback
 */

var form = exports.form = function (model, cb) {
  var err
    , Model
    , Schema

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
    var fieldtype = field.match(/(number|date|email|password|url|tlf)/gi)

    // Required

    Schema[field]['required'] = typeof Schema[field]['isRequired'] !== 'undefined'
                              ? Schema[field]['isRequired']
                              : null

    // Field type
    // TODO #crud Add number, date etc

    fieldtype = fieldtype || 'text'
    Schema[field]['type'] = typeof Schema[field]['options']['override'] !== 'undefined'
                          ? Schema[field]['options']['override']
                          : fieldtype

    // Field name

    Schema[field]['name'] = field.substring(field.lastIndexOf('.') + 1)

    for (var prop in Schema[field]) {
      if (prop === 'selected' && !field[prop]) delete Schema[field]
    }
  }
}

/**
 * Crud express-middleware
 *
 * A middleware route for express that populates res.form with the fields from
 * the specified model.
 */

exports.middleware = function (req, res, next, model) {
  form(model, function (err, form) {
    if (err) return next(err)
    req.locals('form', form)
    return next()
  })
}

