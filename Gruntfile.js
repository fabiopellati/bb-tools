module.exports = function (grunt) {
    grunt.initConfig({
        browserify: {
            bbtools_grid: {
                src: ['./src/bbtools_grid.js'],
                dest: './dist/bbtools_grid.js',
                options: {
                    external: ['jquery', 'backbone'],
                    transform: ['stringify'],
                }
            },
            bbtools_form: {
                src: ['./src/bbtools_form.js'],
                dest: './dist/bbtools_form.js',
                options: {
                    external: ['jquery', 'backbone'],
                    transform: ['stringify']
                }
            },
            bbtools: {
                src: ['./src/bbtools.js'],
                dest: './dist/bbtools.js',
                options: {
                    external: ['jquery', 'backbone'],
                    transform: ['stringify']
                }
            },

        },
        watch: {
            scripts: {
                files: ['./src/**/*.js', './src/*.js','./src/**/*.html', './src/*.html'],
                // tasks: ['browserify', 'copy'],
                tasks: ['browserify', 'uglify'],
                options: {
                    spawn: false,
                    reload: true
                },
            },
        },
        uglify: {
            options: {
                mangle: true,
                compress: true
            },
            my_target: {
                files: {
                    'dist/bbtools-min.js': ['./dist/bbtools.js'],
                    'dist/bbtools_grid-min.js': ['./dist/bbtools_grid.js'],
                    'dist/bbtools_form-min.js': ['./dist/bbtools_form.js'],
                }
            }
        },
        copy: {
            a0001: {
                src: 'dist/bbtools.js',
                dest: 'dist/bbtools-min.js',
            },

            a0002: {
                src: 'dist/bbtools_grid.js',
                dest: 'dist/bbtools_grid-min.js',
            },

            a0003: {
                src: 'dist/bbtools_form.js',
                dest: 'dist/bbtools_form-min.js',
            },
            a0004: {
                src: 'package.json',
                dest: 'dist/package.json',
            },

        },

        // concat: {
        //     'public/main.js': ['public/vendor.js', 'public/app.js']
        // }
    });

    // grunt.loadTasks('../../tasks');
    // grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['browserify','uglify', 'watch']);
    // grunt.registerTask('default', ['browserify', 'copy', 'watch']);
    // grunt.registerTask('watch', ['watch']);
};