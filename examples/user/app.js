
/**
 * Module dependencies.
 */

var express = require('express')
  , app = module.exports = express.createServer()
  , models = require('./models')
  , stylus = require('stylus')
  , nib = require('nib')
  , crud = require('../../lib/crud')

require('express-namespace')

/**
 * Compile stylus with nib
 */

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .set('compress', true)
    .use(nib())['import']('nib')
}

/**
 * Configurations
 */

app.configure(function(){
  app.set('views', __dirname + '/views')
  app.set('view engine', 'jade')
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(stylus.middleware({ src: __dirname + '/public', compile: compile }))
  app.use(app.router)
  app.use(express['static'](__dirname + '/public'))
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }))
})

/**
 * Static helpers
 */

app.helpers({
    environment: process.env.NODE_ENV || 'development'
  , title: 'Crud example'
  , values: null
})

/**
 * API
 *
 * CRUD supports express-namespace
 * This means you can add authentication as middleware for all sub-routes
 */

app.namespace('/api', function () {
  app.crud('users')
})

/**
 * Routes
 */

app.get('/', function (req, res) { res.render('explain') })

/**
 * Start listening
 */

app.listen(3000, function(){
  console.log('Crud example is listening on port %d', app.address().port)
})

