require('./../lib/kernel');
require('./../lib/loader');
require('./../lib/module');

var init = function (config, error, exit) {
  var fail = function (message) {
    error(message);
    exit(false);
  };

  require('./../lib/compiler');
  var fs = require('fs');

  var config_dir = config.config_dir || 'config/bolt';

  if (!fs.existsSync(config_dir))
    fs.mkdirSync(config_dir);
  else if (!fs.statSync(config_dir).isDirectory())
    fail('directory specified for CONFIG_DIR exists but is not a directory');

  var files = fs.readdirSync(config_dir).filter(function (file) {
    return fs.statSync(config_dir + '/' + file).isFile() &&
           file.indexOf('bootstrap') !== 0 &&
           file.length > 3 && file.lastIndexOf('.js') === file.length - 3;
  });

  files.forEach(function (file) {
    var config = config_dir + '/' + file;
    var bootstrap = config_dir + '/bootstrap-' + file;
    ephox.bolt.compiler.mode.dev.run(config, bootstrap);
  });
  exit(true);
};

var test = function (config, log, error, exit) {
  require('./../lib/test');

  var runner = ephox.bolt.test.run.runner;
  var reporter = ephox.bolt.test.report.logger.create(config.verbose, log, error, exit);
  var fn = ephox.bolt.kernel.fp.functions;
  var node = ephox.bolt.module.reader.node;
  var reader = fn.curry(node.read, process.cwd() + '/.', config.config);

  runner.run(reporter, reader, config.tests);
};

var build = function (config, error, exit) {
  var fail = function (message) {
    error(message);
    exit(false);
  };

  require('./../lib/compiler');
  var path = require('path');
  var fs = require('fs');

  // set up logging (exit might be provided by grunt)
  ephox.bolt.compiler.tools.error.setOutput(error, exit);

  // merge dev config on top of defaults
  var fp = ephox.bolt.kernel.fp;
  var boltConfig = ephox.bolt.compiler.tools.defaults();
  fp.object.merge(boltConfig, config);

  // explode config (this all started flat but was refactored)
  var config_js = boltConfig.config_js;
  var output_dir = boltConfig.output_dir;
  var src_dir = boltConfig.src_dir;
  var generate_inline = boltConfig.generate_inline;
  var generate_modules = boltConfig.generate_modules;
  var minimise_module_names = boltConfig.minimise_module_names;
  var register_modules = boltConfig.register_modules;
  var main = boltConfig.main;
  var entry_points = boltConfig.entry_points;
  var entry_groups = boltConfig.entry_groups;
  var verbosity = boltConfig.verbosity;

  var validateFailure = null;
  fp.object.each(entry_groups, function (k, v) {
    if (validateFailure) return;

    if (k.indexOf('/') !== -1) {
      validateFailure = 'entry group name ' + k + ' must not contain special characters';
      return;
    }

    fp.array.each(v, function (file) {
      if (validateFailure) return;

      if (!fs.existsSync(file) || !fs.statSync(file).isFile())
        validateFailure = 'specified file for entry group not found [' + file + ']';
    });
  });

  if (validateFailure) {
    fail(validateFailure);
  }

  // nodejs doesn't have an mkdir -p equivalent
  var mkdirp = function (dir) {
    dir = path.resolve(dir);
    if (!fs.existsSync(dir)) {
      mkdirp(path.dirname(dir));
      fs.mkdirSync(dir);
    }
  };

  // walk a directory tree
  var walk = function (root, processor) {
    var files = fs.readdirSync(root);
    files.forEach(function (file) {
      var filepath = path.join(root, file);
      fs.statSync(filepath).isDirectory() ?
        walk(filepath, processor) : processor(filepath);
    });
  };


  if (minimise_module_names && register_modules) {
    fail('Option "--minimise-module-names" is incompatible with "--register"');
  }

  var targets = [];

  var bolt_build_inline = function (file, name) {
    mkdirp(path.join(output_dir, 'inline'));
    var target = path.join(output_dir, 'inline', name);
    ephox.bolt.compiler.mode.inline.run(config_js, [ file ], target, register_modules, main, minimise_module_names, verbosity);
  };

  var bolt_build_entry_point = function (done) {
    mkdirp(path.join(output_dir, 'compile'));

    var process = function (file) {
      var id = ephox.bolt.compiler.mode.identify.run(file);
      var target = path.join(output_dir, 'compile', id + '.js');
      targets.push(target);  // So that things can be linked together later

      ephox.bolt.compiler.mode.compile.run(config_js, [ file ], target, function () {
        if (generate_inline) {
          bolt_build_inline(target, id);
        }
        next();
      });
    };

    var next = function () {
      entry_points.length > 0 ? process(entry_points.shift()) : done();
    };

    next();
  };

  var bolt_build_entry_group = function (done) {
    mkdirp(path.join(output_dir, 'compile'));

    var groups = Object.keys(entry_groups);

    var process = function (group) {
      var target = path.join(output_dir, 'compile', group + '.js');
      targets.push(target);  // So that things can be linked together later

      ephox.bolt.compiler.mode.compile.run(config_js, entry_groups[group], target, function () {
        if (generate_inline) {
          bolt_build_inline(target, group);
        }
        next();
      });
    };

    var next = function () {
      groups.length > 0 ? process(groups.shift()) : done();
    };

    next();
  };

  var bolt_link = function () {
    var link_output = path.join(output_dir, 'compile/bootstrap.js');
    ephox.bolt.compiler.mode.link.run(config_js, targets, link_output);
  };

  var bolt_modules = function () {
    if (!fs.existsSync(src_dir) || !fs.statSync(src_dir).isDirectory())
      fail(1, config_js + ' does not exist or is not a directory');

    if (generate_modules) {
      var module_dir = path.join(output_dir, 'module');
      mkdirp(module_dir);
      walk(src_dir, function (file) {
        var name = ephox.bolt.compiler.mode.identify.run(file);
        fs.writeFileSync(path.join(module_dir, name + '.js'), fs.readFileSync(file));
      });
    }
  };

  if (!fs.existsSync(config_js) || !fs.statSync(config_js).isFile())
    fail(1, config_js + ' does not exist or is not a file');

  bolt_build_entry_point(function () {
    bolt_build_entry_group(function () {
      if (targets.length > 0)
        bolt_link();

      if (generate_modules) {
        bolt_modules();
      }
      exit(true);
    });
  });
};

module.exports = {
  init: init,
  build: build,
  test: test
};