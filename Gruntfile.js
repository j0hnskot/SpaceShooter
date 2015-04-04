 /**
 * @author      John Skotiniotis <j0hnskot@gmail.com>
 * @copyright   2014 - John Skotiniotis
 * @license     {@link http://choosealicense.com/licenses/mit/ | MIT License}
 * @version     0.0.2
 * @date        14/11/2014
 */

module.exports = function (grunt) {


    var productionBuild = !!(grunt.cli.tasks.length && grunt.cli.tasks[0] === 'release');

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-execute');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');


    // Configuration goes here
    grunt.initConfig({

           watch:{
            options: {
              livereload: true
            },
            files:['**/*.js','**/*.html', '**/*.css', '**/*.png']
        },

        connect : {
            options : {
            hostname : 'localhost',
            port : 8080,
            livereload : 35729
            },
            myserver: {
            }
        },


        execute: {

            src: ['Font/convertFont.js']
        },

        uglify: {
            "testing": {
                options: {
                    mangle: false,
                     compress: {
                        drop_console: productionBuild,
                        drop_debugger: productionBuild
                    }
                },
                files: {
                    'minified/js/game.js': ['js/**/*.js']
									//, 'port/js/game.js': ['dev/js/lib/cocoon.min.js','dev/js/lib/phaser.js','dev/js/lib/config.js/','dev/js/states/Boot.js','dev/js/**/*.js', '!dev/**/editor.js']


                }
            },
            "release": {
                options: {
                    mangle: false,
                     compress: {
                        drop_console: productionBuild,
                        drop_debugger: productionBuild
                    }
                },
                files: {
                    'minified/js/game.js': ['dev/js/lib/config.js/','dev/js/states/Boot.js','dev/js/**/*.js','!dev/**/cocoon.min.js' ,'!dev/**/iap.js','!dev/**/shop.js','!dev/**/jsParser.js' ,'!/dev/**/editor.js'],
                    'port/js/game.js': ['dev/js/lib/cocoon.min.js','dev/js/lib/phaser.js','dev/js/lib/config.js/','dev/js/states/Boot.js','dev/js/**/*.js', '!dev/**/editor.js']

                }
            }
        },

        compress: {


            minified: {
                options: {
                    archive: 'minified.zip',
                    mode: 'zip'
                },
                files: [
                    {
                        src: '**/*',
                        cwd: 'minified/',
                        expand: true
                    }
                ]
            }
        },


        copy: {



            main: {
                files: [
									{
										cwd: '',
										src: ['index.html'],
										dest: 'minified/',
										expand: true
									},

									{

										cwd: 'assets/',
										src: '*',
										dest: 'minified/assets',
										expand: true

									},


                ]
            }


        },

        clean: ["port/**","minified/**"]





    });


    // Load plugins here




    // Define your tasks here
    grunt.registerTask('default', ['clean',  'uglify:testing', 'copy:main', 'compress']);
    grunt.registerTask('server', ['connect','watch']);


};
