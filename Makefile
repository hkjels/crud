.PHONY: docs lint test clean cleandocs mocha cream sugar and with


# Procedures

docs: docs/index.html

lint:
	@./node_modules/.bin/jshint ./lib

test:
	@./node_modules/.bin/mocha test/*.test.js

clean: cleandocs

cleandocs:
	rm -rf docs/*.html


# Aliases

mocha: test

cream: lint

sugar: docs

and:
	@true

with:
	@true


# Compile

docs/index.html: docs/layout/head.html docs/Readme.html docs/layout/tail.html
	@cat $^ > $@

docs/%.html: %.md
	@./node_modules/.bin/marked $< > $@
