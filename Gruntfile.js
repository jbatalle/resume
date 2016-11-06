module.exports = function(grunt) {
    // Project Configuration
    grunt.initConfig({
        exec: {
            run_server: {
                cmd: "node web/serve.js"
            },
            build_index: {
                cmd: "node web/render.js"
            },
            pdf: {
                cmd: "phantomjs pdf/html2pdf.js pdf/index.html pdf/josep_batalle_cv.pdf"
            }
        },
        copy: {
            resumejson: {
                cwd: './',
                src: [ 'resume.json' ],
                dest: './web/node_modules/resume-schema',
                expand: true
            },
            build: {
                cwd: './assets/css',
                src: [ 'theme.css' ],
                dest: './assets/css',
                expand: true
            },
            favicon: {
                cwd: '.',
                src: [ 'favicon.ico' ],
                dest: '.',
                expand: true
            }
        },
        clean: {
            build: {
                src: [ './' ]
            }
        }
    });

    // Load the plugin that compiles less to css
    grunt.loadNpmTasks('grunt-contrib-less');

    // Load the plugin that watches file changes
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Load the plugin to execute shell commands
    grunt.loadNpmTasks('grunt-exec');

    // Load the plugin to clean directories
    grunt.loadNpmTasks('grunt-contrib-clean')

    // Load the plugin to copy files
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default tasks
    grunt.registerTask('default', ['exec']);
    grunt.registerTask('build', [
        /* Uncomment this item once you've created your own resume.json file
           in the project root.  This will use your own data to build your site.
         */
        // 'copy:resumejson',
        /*'clean',*/
        'copy:resumejson',
        'copy:build',
        'exec:pdf',
        /*'less',*/
        'exec:build_index' //,
        /* Uncomment this item (and the comma above) if you add a favicon.ico
           in the project root. You'll also need to uncomment the <link...> tag
           at the top of resume.template.
         */
        // 'copy:favicon'
    ]);
    grunt.registerTask('serve', [
        'build',
        'exec:run_server'
    ])
}
