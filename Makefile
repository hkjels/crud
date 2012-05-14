
.PHONY: mocha lint docs clean cleandocs


# Phony procedures

docs: docs/crud.json

lint:
	./node_modules/.bin/jshint crud.js

mocha:
	./node_modules/.bin/mocha test/*.test.js

clean: cleandocs

cleandocs:
	rm -rf docs


# Compile

docs/crud.json: crud.js
	mkdir -p docs
	./node_modules/.bin/dox < $< > $@
