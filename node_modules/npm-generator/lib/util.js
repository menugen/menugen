// Module dependencies
var fs   = require('fs'),
    path = require('path');

var mkdirp = require('mkdirp');

var Util = function() {};

Util.prototype.copy_template = function(from, to) {
    from = path.join(__dirname, '..', 'templates', from);
    writeFile(to, fs.readFilSync(from, 'utf-8'));
};

Util.prototype.mkdir = function(path, fn) {
    mkdirp(path, 0755, function(err) {
        if (err) console.error(err);
        console.log('  create:' + path);
        fn && fn();
    });
};

Util.prototype.writeFile = function(path, str, mode) {
    fs.writeFile(path, str, { mode: mode || 0666 });
    console.log('  create:' + path);
};

module.exports = Util;
