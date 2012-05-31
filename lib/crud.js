
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
 * Model & instance-name
 */

var instance
  , Model

/**
  * Monkeypatch express with `crud`
  */

app.crud = function (name, options) {
  for (var model in mongoose.models) {
    if (!mongoose.models.hasOwnProperty(model)) continue
    if (model.toLowerCase() === name.toLowerCase()) Model = mongoose.model(model)
  }
  instance = en.singularize(Model.modelName).toLowerCase()
  this.resource(name, resource)
}

/**
 * Resourcefull routes
 */

var resource = {

  /**
   * Index GET /
   *
   * Will display a list of all the instances the model can find
   */

    index: function (req, res) {
     Model.find({}, function (err, docs) {
       res.json(docs)
       res.end()
     })
    }

  /**
   * New GET /new
   *
   * Displays a form for creating new instances
   */

  , 'new': function (req, res) {
      var form = friendly(Model)

      form.name = instance.toLowerCase()
      form.model = Model.modelName.toLowerCase()

      res.render('form', {'form': form})
    }

  /**
   * Create POST /
   *
   * Creates a new instance in the database, based on the result of `new`
   */

  , create: function (req, res, next) {
      var model = new Model()

      for (var key in req.body) {
        if (key == '_id' || !req.body[key]) continue
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

  , show: function (req, res) {
      var instance = instance.toLowerCase()
      res.json(req[instance])
      res.end()
    }

  , edit: function (req, res) {
      var instance = instance.toLowerCase()
        , form = friendly(req[instance])

      form.name = instance
      form.model = Model.modelName.toLowerCase()

      res.render('form', {'form': form})
    }

  , update: function (req, res) {
      var instance = instance.toLowerCase()
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

  , destroy: function (req, res, next) {
      var instance = instance.toLowerCase()
        , model = req[instance]

      instance.remove()
      instance.save(function (err) {
        if (err) return next(err)
        res.redirect('back')
      })
    }

  , load: function (req, id, cb) {
      Model.findById(id, function (err, doc) {
        cb(err, doc)
      })
    }
}

