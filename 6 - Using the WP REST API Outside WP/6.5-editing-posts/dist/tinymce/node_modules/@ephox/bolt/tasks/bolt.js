module.exports = function(grunt) {
  var bolt = require("../npm/bolt");

  grunt.registerMultiTask("bolt-init", "Bolt init task", function () {
    var done = this.async();

    var config = grunt.config([this.name, this.target]);

    bolt.init(config, grunt.log.error, done);
  });

  grunt.registerMultiTask("bolt-build", "Bolt build task", function () {
    var done = this.async();

    var config = grunt.config([this.name, this.target]);

    this.requiresConfig([this.name, this.target, 'files']);

    var filename = config.filename || this.target;

    // adapt between grunt file normalisation and bolt internal config
    config.entry_groups = {};
    config.entry_groups[filename] = this.filesSrc;

    bolt.build(config, grunt.log.error, done);
  });

  grunt.registerMultiTask("bolt-test", "Bolt test task", function () {
    var done = this.async();

    var config = grunt.config([this.name, this.target]);

    this.requiresConfig([this.name, this.target, 'config']);
    this.requiresConfig([this.name, this.target, 'files']);

    // adapt between grunt file normalisation and bolt internal config
    config.tests = this.filesSrc;

    bolt.test(config, grunt.log.ok, grunt.log.error, done);
  });
};