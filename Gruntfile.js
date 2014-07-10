module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: ['Gruntfile.js', 'index.js', 'public/js/*.js', '!public/js/*.min.js'],
            options: {
                globals: {
                    'jQuery': true
                }
            }
        },
        uglify: {
          options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
            compress: {
              drop_console: true
            }
          },
          build: {
            files: {
              'public/js/jquery.chat.min.js': ['public/js/jquery.chat.js']
            }
          }
        },
        cssmin: {
          minify: {
            expand: true,
            cwd: 'public/css',
            src: ['*.css', '!*.min.css'],
            dest: 'public/css',
            ext: '.min.css'
          },
          options: {
            report: {
              default: 'min'
            }
          }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'cssmin', 'uglify']);
};
