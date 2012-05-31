# crud

__Crud-functionality for mongoose and express__


## Install

    λ npm install crud


## Usage

    var express = require('express')
      , app = express.createServer()
      , models = require('./models')

    require('crud')

    app.crud('modelname')

## REST-api

The action-mapping is inherited from
[express-resource](https://github.com/visionmedia/express-resource)
and is as follows

    GET     /forums              ->  index
    GET     /forums/new          ->  new
    POST    /forums              ->  create
    GET     /forums/:forum       ->  show
    GET     /forums/:forum/edit  ->  edit
    PUT     /forums/:forum       ->  update
    DELETE  /forums/:forum       ->  destroy


## Roadmap

Crud is not nearly at a finite-state, but will be under heavy development and
testing in the near future. There's no official roadmap per se, but you can
assume that these features will be implemented shortly:

* Automatic and manual messages (using express-messages)
* More validation on the client-side
* Setting/retrieving values via sockets


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
