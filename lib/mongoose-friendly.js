
/*!
 * mongoose-friendly
 * Copyright (c) Henrik Kjelsberg 2012 <henrik@kjelsberg.net>
 * MIT licensed
 */

/**
 * Module dependencies
 */

var cycle = require('cycle')
  , mongoose = require('mongoose')
  , lingo = require('lingo')
  , en = lingo.en

/**
 * mongoose-friendly
 *
 * Human friendly Schema for building html-forms
 */

var friendly = module.exports = function friendly (model) {
  var form = { filled: false }
    , Model = typeof model._schema !== 'undefined' ? model : model.prototype
    , Schema = cycle.decycle(Model._schema.paths)
    , copy = { 'isRequired': 'required' }
    , values = Model['_doc'] || null
    , fields = {}

  /**
   * Process Schema
   *
   * Normalization of the Schema-model to a more humanfriendly JSON format
   */

  for (var field in Schema) {
    if (!Schema.hasOwnProperty(field)) continue

    /**
     * Ignored fields
     */

    for (var prop in Schema[field]) {
      if (prop === 'selected' && !field[prop]) continue
    }

    fields[field] = {}

    /**
     * Copy a bunch of parameters
     *
     * The value from the copy-object is used as the key to our new form-object
     * TODO Need a smarter way of pushing values from Schema to form
     */

    for (var key in copy) {
      if (typeof Schema[field][key] !== 'undefined') {
        fields[field][copy[key]] = Schema[field][key]
      }
    }

    /**
     * Field name
     */

    var name = field.split('.')
      , shortName = name

    if (name.length == 1) {
      fields[field]['name'] = name
      fields[field]['shortName'] = name
      if (values && typeof values[name] !== 'undefined') {
        fields[field]['value'] = values[name]
        form.filled = true
      }
    }
    else {
      fields[field]['shortName'] = name[name.length - 1]
      fields[field]['name'] = '['+name.slice(1).join('][')+']'
      fields[field]['name'] = name[0]+fields[field]['name']
      if (values && typeof values[name[0]][name[1]] !== 'undefined') {
        fields[field]['value'] = values[name[0]][name[1]]
        form.filled = true
      }
    }

    /**
     * Field type
     */

    var fieldtype = field.match(/(number|date|email|password|url|tlf)/gi) || 'text'
    fields[field]['type'] = Schema[field].instance === 'boolean' ? 'checkbox' : fieldtype
    fields[field]['type'] = typeof Schema[field]['options']['override'] !== 'undefined'
                        ? Schema[field]['options']['override']
                        : fieldtype
    fields[field]['type'] = fields[field]['type'].toString()
    fields[field]['type'] = field[0] === '_' ? 'hidden' : fields[field]['type']
    if (typeof Schema[field]['options']['min'] !== 'undefined'
        && Schema[field]['options']['min'] >= 50) {
      fields[field]['type'] = 'textarea'
    }
    if (typeof Schema[field]['options']['max'] !== 'undefined') {
      fields[field]['max'] = Schema[field]['options']['max']
    }

    fields[field]['ignore'] = Schema[field].options.ignore
  }

  form['fields'] = fields
  if (values !== null) form['id'] = values['_id']

  return form
}

