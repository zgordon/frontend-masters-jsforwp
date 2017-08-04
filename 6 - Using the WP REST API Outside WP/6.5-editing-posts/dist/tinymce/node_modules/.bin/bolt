#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

var modes = fs.readdirSync(path.join(__dirname, '../command')).map(function (mode) {
  return path.basename(mode, '.js');
});

var usage = function () {
  return 'usage: bolt [-h|--help] [-V|--version]\n' +
         '    or bolt MODE [<args>]\n' +
         '\n' +
         'modes:\n' +
         '  ' + modes.join('\n  ') + '\n' +
         '  help\n' +
         '\n' +
         'For usage/help on a specific mode, use:\n' +
         '  bolt help MODE\n';
};

var fail_usage = function (code, message) {
  console.error(message);
  console.error('');
  console.error(usage());
  process.exit(code);
};

var fail = function (code, message) {
  console.error(message);
  process.exit(code);
};

var version = function () {
  var v = fs.readFileSync(__dirname + '/version', 'UTF-8');
  if (v[v.length - 1] === '\n')
    v = v.substring(0, v.length - 1);
  return v;
};


process.argv.shift();  // argv[0] = node
process.argv.shift();  // argv[1] = bolt.js

if (process.argv.length < 1)
  fail_usage(1, 'error: must specify mode.');

var mode = process.argv[0];
process.argv.shift();

switch (mode) {
  case '-h':
  case '--help':
    console.log(usage());
    process.exit();
  case '-V':
  case '--version':
    console.log('bolt ' + version());
    process.exit();
  case 'help':
    break;
  default:
    if (modes.indexOf(mode) === -1)
      fail_usage(1, 'invalid mode [' + mode + '], must be one of ' + modes.join('|') + '|help');
}


var help_mode = false;

if (mode === 'help') {
  help_mode = true;
  mode = process.argv[0];
  if (modes.indexOf(mode) === -1)
    fail(2, 'help requires argument: bolt help MODE, where MODE is one of ' + modes.join('|'));
}

require('./../command/' + mode)(help_mode);
