var usage = function () {
  return 'usage: bolt init [-c|--config CONFIG_DIR]\n' +
         '\n' +
         'options:\n' +
         '  -c|--config CONFIG_DIR          override bolt configuration directory\n' +
         '                                   default: config/bolt\n' +
         '\n' +
         'example:\n' +
         '  Initialise a project after checkout.\n' +
         '\n' +
         '    bolt init\n';
};

/* jshint node:true */
var fail_usage = function (code, message) {
  console.error(message);
  console.error('');
  console.error(usage());
  process.exit(code);
};

module.exports = function (help_mode) {
  if (help_mode) {
    console.log(usage());
    process.exit();
  }

  var boltConfig = {
  };

  while (process.argv.length > 0 && process.argv[0][0] === '-') {
    var flag = process.argv[0];
    process.argv.shift();

    switch (flag) {
      case '-c':
      case '--config':
        if (process.argv.length < 1)
          fail_usage(1, flag + ' requires an argument to be specified');
        boltConfig.config_dir = process.argv[0];
        process.argv.shift();
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

  require('../npm/bolt').init(boltConfig, console.error, exit);
};
