module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: ['*.json', 'Gruntfile.js', 'index.js', 'public/js/*.js', 'lib/*.js', '!public/js/*.min.js', 'tests/*.js'],
            options: {
                globals: {
                    'jQuery': true,
                    'strict': true
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
        },
        jasmine: {
            all: {
                src: 'public/js/*.js',
                options: {
                    vendor: [
                        'tests/vendor/jquery-1.11.1.min.js',
                        'tests/vendor/jasmine.jquery.js',
                        'tests/vendor/socket.io.js'
                    ],
                    styles:
                        ['public/css/style.min.css'],
                    specs: 'tests/*.spec.js'
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'jasmine:all', 'cssmin', 'uglify']);
};
