
/*!
 * crud
 * Copyright (c) Henrik Kjelsberg 2012 <henrik@kjelsberg.net>
 * MIT licensed
 */

/**
 * Module dependencies
 */

var express = require('express')
  , Resource = require('express-resource')
  , lingo = require('lingo')
  , mongoose = require('mongoose')
  , friendly = require('./mongoose-friendly')
  , en = lingo.en
  , app = express.application
    ? express.application
    : express.HTTPServer.prototype

/**
 * Resource
 *
 * @param {mongoose.Model} Model
 */

var Resource = function Resource (Model) {
  this.Model = Model
}

/**
 * Index GET /
 *
 * Will display a list of all the instances the model can find
 */

Resource.prototype.index = function (req, res) {
  this.Model.find({}, function (err, docs) {
    res.json(docs)
    res.end()
  })
}

/**
 * New GET /new
 *
 * Displays a form for creating new instances
 */

Resource.prototype['new'] = function (req, res) {
  var form = friendly(this.Model)
  form.name = this.Model.modelName.toLowerCase()
  res.render('form', {'form': form})
}

/**
 * Create POST /
 *
 * Creates a new instance in the database, based on the result of `new`
 */

Resource.prototype.create = function (req, res, next) {
  var model = new this.Model()

  for (var key in req.body) {
    if (key === '_id' || !req.body[key]) continue
    model[key] = req.body[key]
  }

  model.save(function (err) {
    if (err) return next(err)
    res.redirect('back')
  })
}

/**
 * Show GET /:instance
 *
 * Show information about a single instance
 */

Resource.prototype.show = function (req, res) {
  res.json(req[this.Model.modelName])
  res.end()
}

/**
 * Edit
 *
 * Display a form for editing existing instance
 */

Resource.prototype.edit = function (req, res) {
  var instance = en.singularize(this.Model.modelName).toLowerCase()
    , model = req[instance]
    , form = friendly(model)
  form.name = this.Model.modelName.toLowerCase()
  res.render('form', {'form': form})
}

/**
 * Update
 *
 * Update document with changes passed to req.body
 */

Resource.prototype.update = function (req, res) {
  var instance = en.singularize(this.Model.modelName).toLowerCase()
    , model = req[instance]

  for (var key in req.body) {
    if (key === '_id') continue
    model[key] = req.body[key]
  }

  model.save(function (err) {
    if (err) throw err
    res.redirect('back')
  })
}

/**
 * Destroy
 *
 * Remove record from document
 */

Resource.prototype.destroy = function (req, res, next) {
  var instance = en.singularize(this.Model.modelName).toLowerCase()
    , model = req[instance]

  model.remove()
  model.save(function (err) {
    if (err) return next(err)
    res.redirect('back')
  })
}

/**
 * Load
 *
 * Autoload record using the passed id
 */

Resource.prototype.load = function (req, id, cb) {
  this.Model.findById(id, function (err, doc) {
    cb(err, doc)
  })
}

/**
* Monkeypatch express with `crud`
*/

app.crud = function (name, actions, opts) {
  var options = actions || {}
    , res
    , Model

  for (var model in mongoose.models) {
    if (!mongoose.models.hasOwnProperty(model)) continue
    if (model.toLowerCase() === name.toLowerCase()) Model = mongoose.model(model)
  }

  this.resources = this.resources || {}
  res = this.resources[name] = this.resource(name, new Resource(Model))
  return res
}

