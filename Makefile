.PHONY: docs lint test clean cleandocs mocha cream sugar and with


# Procedures

docs: docs/crud.json

lint:
	./node_modules/.bin/jshint crud.js

test:
	./node_modules/.bin/mocha test/*.test.js

clean: cleandocs

cleandocs:
	rm -rf docs


# Aliases

mocha: test

cream: lint

sugar: docs

and:
	@true

with:
	@true


# Compile

docs/crud.json: crud.js
	mkdir -p docs
	./node_modules/.bin/dox < $< > $@
