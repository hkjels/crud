
/**
 * Module dependencies.
 */

var express = require('express')
  , app = module.exports = express.createServer()
  , routes = require('./routes')
  , models = require('./models')
  , stylus = require('stylus')
  , nib = require('nib')
  , crud = require('../../crud')


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
    environment: process.env.NODE_ENV
  , title: 'Crud example'
  , values: null
})

/**
 * Routes
 */

app.get('/', routes.explain)
app.get('/:model', crud.middleware, routes.form)

/**
 * Start listening
 */

app.listen(8080, function(){
  console.log('Crud example is listening on port %d', app.address().port)
})

