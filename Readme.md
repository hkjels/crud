# crud

__Crud functionality for mongoose-models. Fits well with express.js__


## Install

    λ npm install crud


## With express.js

    var express = require('express')
      , app = module.exports = express.createServer()
      , mongoose = require('mongoose')
      , Model = require('./Model')
      , crud = require('crud')

    app.get('/crud/:model', crud, function (req, res) {
      res.render('crud')
    })
