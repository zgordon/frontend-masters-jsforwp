#!/usr/bin/env node

var usage = function () {
  return 'usage: jsc dev      [-c|--config CONFIG_JS] [BOOTSTRAP_TARGET]\n' +
         '    or jsc compile  [-c|--config CONFIG_JS] MODULE_FILE ... COMPILE_TARGET\n' +
         '    or jsc identify MODULE_FILE\n' +
         '    or jsc inline   [-c|--config CONFIG_JS] [-n|--invoke-main MAIN_MODULE]\n' +
         '                    [-r|--register] COMPILE_FILE ... LINK_TARGET\n' +
         '    or jsc link     [-c|--config CONFIG_JS] COMPILE_FILE ... LINK_TARGET\n' +
         '    or jsc help\n' +
         '\n' +
         'arguments:\n' +
         '  BOOTSTRAP_TARGET file to generate for running in dev mode, this defaults\n' +
         '                   to a file called bootstrap.js in the same directory as\n' +
         '                   CONFIG_JS\n' +
         '  MODULE_FILE      file containing an uncompiled module\n' +
         '  COMPILE_TARGET   file to generate when compiling, will contain the set of\n' +
         '                   modules and their dependencies\n' +
         '  COMPILE_FILE     file produced by compilation to use as input to linking\n' +
         '  LINK_TARGET      file to generate when linking, will contain bootstrap\n' +
         '                   information: bolt, install and configuration\n' +
         '\n' +
         'options:\n' +
         '  -c|--config CONFIG_JS          override bolt configuration file\n' +
         '                                   default: config/bolt/prod.js\n' +
         '  -n|--invoke-main MAIN_MODULE   specify main module of inline scripts\n' +
         '  -r|--register                  register modules in global namespace for\n' +
         '                                 inline scripts\n';
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


process.argv.shift();  // argv[0] = node
process.argv.shift();  // argv[1] = jsc.js

if (process.argv.length < 1)
  fail_usage(1, 'error: must specify mode.');

var mode = process.argv[0];
process.argv.shift();

switch (mode) {
  case 'dev':
  case 'compile':
  case 'identify':
  case 'inline':
  case 'link':
  case 'help':
    break;
  default:
    fail_usage(1, 'invalid mode [' + mode + '], must be one of dev|compile|identify|inline|link|help');
}

if (mode === 'help') {
  console.log(usage());
  process.exit();
}


var config_js = 'config/bolt/prod.js';
var register_modules = false;
var main = undefined;

while (process.argv.length > 0 && process.argv[0][0] === '-') {
  var flag = process.argv[0];
  process.argv.shift();

  switch (flag) {
    case '-c':
    case '--config':
      if (process.argv.length < 1)
        fail_usage(1, flag + ' requires an argument to be specified');
      config_js = process.argv[0];
      process.argv.shift();
      break;
    case '-n':
    case '--invoke-main':
      if (process.argv.length < 1)
        fail_usage(1, flag + ' requires an argument to be specified');
      main = process.argv[0];
      process.argv.shift();
      break;
    case '-r':
    case '--register':
      register_modules = true;
      break;
    case '--':
      break;
    default:
      fail_usage(1, 'invalid flag [' + flag +']');
  }
}


require('./../lib/kernel');
require('./../lib/loader');
require('./../lib/module');
require('./../lib/compiler');

var path = require('path');
var fs = require('fs');


var dev = function () {
  var bootstrap = '';
  switch (process.argv.length) {
    case 0:
      bootstrap = path.dirname(config_js) + '/bootstrap.js';
      break;
    case 1:
      bootstrap = process.argv[0];
      break;
    default:
      fail_usage(1, 'invalid number of arguments for jsc dev [' + process.argv.length + ']');
  }

  ephox.bolt.compiler.mode.dev.run(config_js, bootstrap);
};

var compile = function () {
  if (process.argv.length < 2)
    fail_usage(1, 'invalid number of arguments for jsc compile [' + process.argv.length + ']');

  var files = process.argv.slice(0, -1);
  var target = process.argv[process.argv.length - 1];
  ephox.bolt.compiler.mode.compile.run(config_js, files, target);
};

var identify = function () {
  if (process.argv.length !== 1)
    fail_usage(1, 'invalid number of arguments for jsc identify [' + process.argv.length + ']');

  var id = ephox.bolt.compiler.mode.identify.run(process.argv[0]);
  console.log(id);
};

var inline = function () {
  if (process.argv.length < 2)
    fail_usage(1, 'invalid number of arguments for jsc inline [' + process.argv.length + ']');

  var files = process.argv.slice(0, -1);
  var target = process.argv[process.argv.length - 1];
  ephox.bolt.compiler.mode.inline.run(config_js, files, target, register_modules, main);
};

var link = function () {
  if (process.argv.length < 2)
    fail_usage(1, 'invalid number of arguments for jsc link [' + process.argv.length + ']');

  var files = process.argv.slice(0, -1);
  var target = process.argv[process.argv.length - 1];
  ephox.bolt.compiler.mode.link.run(config_js, files, target);
};


if (!fs.existsSync(config_js) || !fs.statSync(config_js).isFile())
  fail(1, config_js + ' does not exist or is not a file');

var jsc = {
  dev: dev,
  compile: compile,
  identify: identify,
  inline: inline,
  link: link
};

jsc[mode]();
