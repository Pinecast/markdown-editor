var fs = require('fs');
var path = require('path');

var babelify = require('babelify');
var browserify = require('browserify');


browserify({cache: false, standalone: 'markdown'})
    .transform(babelify)
    .add(path.join(__dirname, 'src', 'app.js'))
    .bundle()
    .on('error', function(err, data){
        console.error(err.message);
    })
    .pipe(fs.createWriteStream('build/markdown-editor.js'));
