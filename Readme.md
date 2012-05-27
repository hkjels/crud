# crud

__Crud-functionality for mongoose-models. Fits well with express.js__


## Install

    λ npm install crud


## With express.js magic

    var express = require('express')
      , app = module.exports = express.createServer()
      , models = require('./models')
      , crud = require('crud')

    app.get('/crud/:model', crud.middleware, function (req, res) {
      res.render('crud')
    })


## Without express.js magic

    var mongoose = require('mongoose')
      , Model = mongoose.model('Model')
      , crud = require('crud').form

    crud(Model, function (err, form) {
      if (err) return console.err(err)
      console.dir(form)
    })


## Constributors

*	Henrik Kjelsberg <hkjels@me.com> 
[github](http://github.com/hkjels/ "Github account")
[website](http://take.no/ "Development blog")


## License

> (The MIT License)
>
> Copyright (c) 2012 Henrik Kjelsberg &lt;henrik@kjelsberg.net&gt;
>
> Permission is hereby granted, free of charge, to any person obtaining
> a copy of this software and associated documentation files (the
> 'Software'), to deal in the Software without restriction, including
> without limitation the rights to use, copy, modify, merge, publish,
> distribute, sublicense, and/or sell copies of the Software, and to
> permit persons to whom the Software is furnished to do so, subject to
> the following conditions:
>
> The above copyright notice and this permission notice shall be
> included in all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
> EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
> MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
> IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
> CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
> TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
> SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
