module.exports = function (grunt) {
    "use strict";

    // require('jit-grunt')(grunt, {
    //     clean: 'grunt-contrib-clean'
    // });
    require('jit-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*!\n' +
            ' * Project   : <%= pkg.name %>(<%= pkg.description %>) v<%= pkg.version %>\n' +
            ' * Producer  : <%= pkg.author.name %> | <%= pkg.author.email %>\n' +
            ' * Homepage  : <%= pkg.homepage %>\n' +
            ' * Update    : <%= grunt.template.today("yyyy-mm-dd") %>\n' +
            ' * License   : <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
            ' */\n',

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        'html/**/*',
                    ]
                }]
            },
        },
        copy: {
            img: {
                files: [{
                    expand: true,
                    cwd: 'docs/images/',
                    src: '**/*.{png,jpeg,jpg,gif,svg}',
                    dest: 'html/images/'
                },]
            },
            css: {
                files: [{
                    expand: true,
                    cwd: 'template/css/',
                    src: '*.css',
                    dest: 'html/css/'
                }]
            },
            js: {
                files: [{
                    expand: true,
                    cwd: 'template/js/',
                    src: '*.js',
                    dest: 'html/js/'
                }]
            }
        },

        markdown: {
            options: {
                template: 'template/index.html',
                // preCompile: function(src, context) {},
                // postCompile: function(src, context) {},
                templateContext: {
                    title: '웹퍼블리셔 가이드'
                },
                contextBinderMark: '@@@',
                markdownOptions: {
                    gfm: true,
                    // highlight: 'manual'
                    // codeLines: {
                    //     before: '<span>',
                    //     after: '</span>'
                    // }
                }
            },
            html: {
                files: [{
                    expand: true,
                    cwd: 'docs/',
                    src: ['**/*.md', '!ex/**/*'],
                    dest: 'html/',
                    ext: '.html'
                }],
            }
        },
        prettify: {
            options: {
                "indent": 4,
                "condense": true,
                "indent_inner_html": false,
                "unformatted": [
                    "a",
                    "code",
                    "pre"
                ]
            },
            dist: {
                expand: true,
                cwd: 'html/',
                src: ['**/*.html'],
                dest: 'html/',
                ext: '.html'
            },
            ex: {
                expand: true,
                cwd: 'docs/',
                src: ['ex/*.html'],
                dest: 'html/',
                ext: '.html'
            },
            template: {
                expand: true,
                cwd: 'template/',
                src: ['index.html'],
                dest: 'template/',
                ext: '.html'
            }
        },
        watch: {
            options: {
                livereload: true
            },
            img: {
                files: ['docs/images/**/*.{gif,jpeg,jpg,png,svg}'],
                tasks: ['copy:img'],
            },
            css: {
                files: ['template/css/**/*.css'],
                tasks: ['copy:css'],
            },
            md: {
                files: ['docs/**/*.md'],
                tasks: ['newer:markdown', 'newer:prettify'],
            },
            html: {
                files: ['**/*.html'],
                tasks: ['newer:prettify'],
                // tasks: '',
            },
            js: {
                files: 'Gruntfile.js',
                tasks: '',
            }
        },

        connect: {
            server: {
                options: {
                    port: 9000,
                    hostname: "localhost",
                    livereload: 35729,
                    // keepalive: true,
                    base: 'html',
                    // base: 'publish',
                    open: 'http://<%= connect.server.options.hostname %>:<%= connect.server.options.port %>/others/index.html'
                }
            }
        },

    });

    // serve
    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['connect', 'watch']);
        }

        grunt.task.run([
            'default',
            'connect',
            'watch'
        ]);
    });

    grunt.registerTask('default', [
        'clean',
        'markdown',
        'prettify',
        'copy'
    ]);

};