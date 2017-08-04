var usage = function () {
  return 'usage: bolt build [-c|--config CONFIG_JS] [-o|--output OUTPUT_DIR]\n' +
         '                  [-s|--src SRC_DIR] [-i|--inline]\n' +
         '                  [-n|--invoke-main MAIN_MODULE] [-r|--register] [-m|--modules]\n' +
         '                  [-e|--entry-points FILE ...] [-g|--entry-group NAME FILE ...]\n' +
         '\n' +
         'options:\n' +
         '  -c|--config CONFIG_JS          override bolt configuration file.\n' +
         '                                   default: config/bolt/prod.js\n' +
         '  -o|--output OUTPUT_DIR         override build output directory. Compiled\n' +
         '                                 output will be located at $OUTPUT_DIR/compile,\n' +
         '                                 inline output at $OUTPUT_DIR/inline, modules at\n' +
         '                                 $OUTPUT_DIR/module.\n' +
         '                                   default: scratch/main/js\n' +
         '  -s|--src SRC_DIR               override source directory.\n' +
         '                                   default: src/main/js\n' +
         '  -i|--inline                    enable generation of inline scripts (only\n' +
         '                                 produces output in conjunction with -e or -g).\n' +
         '  -a|--minimise-module-names     use short aliases to minimise modules names.\n' +
         '  -n|--invoke-main MAIN_MODULE   specify a main module for inline scripts.\n' +
         '  -r|--register                  register modules in a global namespace for\n' +
         '                                 inline scripts. Defaults to true unless -n is\n' +
         '                                 specified.\n' +
         '  -m|--modules                   enable generation of flat module files.\n' +
         '  -e|--entry-points FILE ...     specify a set of entry points. A compiled\n' +
         '                                 output will be will be generated for each entry\n' +
         '                                 point. Multiple -e flags may be specified.\n' +
         '  -g|--entry-group NAME FILE ... specify an entry group. A single compiled\n' +
         '                                 output will be generated with NAME for each\n' +
         '                                 entry group. Multiple -g flags may be\n' +
         '                                 specified.\n' +
         '  -v|--verbose                   increase verbosity of logging output.\n' +
         '\n' +
         'example:\n' +
         '  Produce a bolt build for a top level application. A compiled file will be\n' +
         '  generated for each Main module in this example.\n' +
         '\n' +
         '    bolt build -e src/main/js/**/*Main.js\n' +
         '\n' +
         '\n' +
         '  Produce a bolt build for a top level library. A self-contained script\n' +
         '  registering all modules globally in their namespace will be produced.\n' +
         '\n' +
         '    bolt build -i -g example src/main/js/**/api/*.js\n' +
         '\n' +
         '\n' +
         '  Produce a bolt build for a general purpose library. In this build we only want\n' +
         '  modules to be produced, no compiled output.\n' +
         '\n' +
         '    bolt build -m src/main/js\n' +
         '\n' +
         '\n' +
         'note:\n' +
         '  Examples assume use of a shell with "**" glob support. This means either zsh\n' +
         '  or bash 4.x with `shopt -s globstar` set. If you are an insolent mac user with\n' +
         '  a default bash 3.x, this tool strongly recommends you upgrade (although\n' +
         '  defenestration of said mac is also a valid option).\n' +
         '\n' +
         '  If you become desperate something like $(find src/test/js/atomic -name \*.js)\n' +
         '  could be used as a substitute.\n';
};

/* jshint node:true */
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


module.exports = function (help_mode) {
  if (help_mode) {
    console.log(usage());
    process.exit();
  }

  // defaults are now in the NPM bolt module, but mutated options are easier to just define here as well
  var boltConfig = {
    entry_points: [],
    entry_groups: {},
    verbosity: 0
  };

  var fs = require('fs');

  while (process.argv.length > 0 && process.argv[0][0] === '-') {
    var flag = process.argv[0];
    process.argv.shift();

    switch (flag) {
      case '-c':
      case '--config':
        if (process.argv.length < 1)
          fail_usage(1, flag + ' requires an argument to be specified');
        boltConfig.config_js = process.argv[0];
        process.argv.shift();
        break;
      case '-o':
      case '--output':
        if (process.argv.length < 1)
          fail_usage(1, flag + ' requires an argument to be specified');
        boltConfig.output_dir = process.argv[0];
        process.argv.shift();
        break;
      case '-s':
      case '--src':
        if (process.argv.length < 1)
          fail_usage(1, flag + ' requires an argument to be specified');
        boltConfig.src_dir = process.argv[0];
        process.argv.shift();
        break;
      case '-n':
      case '--invoke-main':
        if (process.argv.length < 1)
          fail_usage(1, flag + ' requires an argument to be specified');
      boltConfig.main = process.argv[0];
      process.argv.shift();
        break;
      case '-r':
      case '--register':
        boltConfig.register_modules = true;
        break;
      case '-i':
      case '--inline':
        boltConfig.generate_inline = true;
        break;
      case '-a':
      case '--minimise-module-names':
        boltConfig.minimise_module_names = true;
        break;
      case '-m':
      case '--modules':
        boltConfig.generate_modules = true;
        break;
      case '-e':
      case '--entry-points':
        if (process.argv.length < 1)
          fail_usage(1, flag + ' requires an argument to be specified');

        while (process.argv.length > 0 && process.argv[0][0] !== '-') {
          var entry = process.argv[0];
          process.argv.shift();
          if (!fs.existsSync(entry) || !fs.statSync(entry).isFile())
            fail(1, 'specified file for entry point not found [' + entry + ']');
          boltConfig.entry_points.push(entry);
        }
        break;
      case '-g':
      case '--entry-group':
        if (process.argv.length < 2)
          fail_usage(1, flag + ' requires two arguments to be specified');
        var name = process.argv[0];
        process.argv.shift();
        boltConfig.entry_groups[name] = [];

        while (process.argv.length > 0 && process.argv[0][0] !== '-') {
          var file = process.argv[0];
          process.argv.shift();
          if (!fs.existsSync(file) || !fs.statSync(file).isFile())
            fail(1, 'specified file for entry group not found [' + file + ']');
          boltConfig.entry_groups[name].push(file);
        }
        break;
      case '-v':
      case '--verbose':
        boltConfig.verbosity++;
        break;
      case '--':
        break;
      default:
        fail_usage(1, 'invalid flag [' + flag +']');
    }
  }

  var exit = function (success) {
    process.exit(success ? 0 : 1);
  };

  require('../npm/bolt').build(boltConfig, console.error, exit);
};
