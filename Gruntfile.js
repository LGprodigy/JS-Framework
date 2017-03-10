module.exports = function(grunt) {
  "use strict";

  var gzip = require( "gzip-js" );

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    concat: {
      dist: {
        src: [
          'src/start.js',
          'src/vars.js',
          'src/ZCJ.js',
          'src/mage.js',
          'src/magic.js',
          'src/init.js',
          'src/mage/*.js',
          'src/magic/*.js',
          'src/end.js'
          ],
        dest: 'dist/ZCJ-Framework.js'
      }
    },

    jshint: {
      all: {
        src: [
          'Gruntfile.js', 'src/**/*.js'
        ],
        jshintrc: true
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        jshintrc: true
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.title %> v<%= pkg.version %>, By: <%= pkg.author.name %> ' +
                '(c) <%= pkg.copyright %> <%= grunt.template.today("yyyy") %> | https://raw.githubusercontent.com/ZippCast/JS-Framework/master/LICENSE */\n'
      },
      dist: {
        files: {
          'dist/ZCJ-Framework.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },

    compare_size: {
      files: [ "<%= concat.dist.dest %>", "dist/zc_js-UIX.min.js" ],
      options: {
        compress: {
          gz: function( contents ) {
            return gzip.zip( contents, {} ).length;
          }
        },
        cache: "dist/.sizecache.json"
      }
    },

    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('test', ['jshint']);

  grunt.registerTask('default', ['concat', 'jshint', 'uglify', 'compare_size']);
};