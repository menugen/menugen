// Module dependencies
var fs   = require('fs'),
    path = require('path');

// 3rd-party Module dependencies
var commander = require('commander'),
    mkdirp    = require('mkdirp');

// Load Utilities
var Util = require('./lib/util');
var util = new Util();

// Pacakge info
var pkg = require('./package.json');

commander
    .version(pkg.version)
    .on('--help', function() {
        console.log('  Example:');
        console.log('');
        console.log('  $ npm-generator test');
        console.log('');
    }).parse(process.argv);

// Pcakge path
var pkg_path = commander.args.shift() || '.';

// Files
var license   = fs.readFileSync(__dirname + '/templates/LICENSE', 'utf-8');
var npmignore = fs.readFileSync(__dirname + '/templates/.npmignore', 'utf-8');
var travis    = fs.readFileSync(__dirname + '/templates/.travis.yml', 'utf-8');
var reademe   = fs.readFileSync(__dirname + '/templates/README.md', 'utf-8');

var pkg      = fs.readFileSync(__dirname + '/templates/bin/pkg', 'utf-8');
var lib      = fs.readFileSync(__dirname + '/templates/lib/index.js', 'utf-8');
var index    = fs.readFileSync(__dirname + '/templates/index.js', 'utf-8');
var pkg_json = fs.readFileSync(__dirname + '/templates/package.json', 'utf-8');

function generator() {
    console.log('\n  Generating package...\n');
    var mkdir = util.mkdir,
        writeFile = util.writeFile;

    mkdir(pkg_path, function() {
        // Directories
        mkdir(pkg_path + '/lib');
        mkdir(pkg_path + '/bin');

        writeFile(pkg_path + '/bin/pkg', pkg);
        writeFile(pkg_path + '/lib/index.js', lib);
        writeFile(pkg_path + '/index.js', index);
        writeFile(pkg_path + '/package.json', pkg_json);
        // Other files
        writeFile(pkg_path + '/README.md', reademe);
        writeFile(pkg_path + '/LICENSE', license);
        writeFile(pkg_path + '/.npmignore', npmignore);
        writeFile(pkg_path + '/.travis.yml', travis);
    });
}

module.exports = generator;
