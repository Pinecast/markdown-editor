all: js css

js:
	node build.js
	uglifyjs build/markdown-editor.js -c -m --screw-ie8 -o build/markdown-editor.min.js

css:
	cat src/css/* > build/markdown-editor.css
	./node_modules/.bin/crass build/markdown-editor.css --optimize O1 > build/markdown-editor.min.css
