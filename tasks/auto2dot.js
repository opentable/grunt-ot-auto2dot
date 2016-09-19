/*
 * grunt-ot-auto2dot
 * https://github.com/opentable/ot-auto2dot
 *
 * Copyright (c) 2016 Matt Blair
 * Licensed under the MIT license.
 */

'use strict';

const auto2dot = require('auto2dot');

module.exports = function(grunt) {
  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('auto2dot', 'Generate Graphviz files from async.auto calls', function() {
    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      f.src.forEach(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
        } else {
          const src = grunt.file.read(filepath);

          const output = auto2dot.buildGraphVizDotString(
            auto2dot.findAutoSubtree(auto2dot.getAst(src))
          );
          grunt.file.write(f.dest, output);
          // Print a success message.
          grunt.log.writeln('File "' + f.dest + '" created.');
        }
      });

    });
  });
};
