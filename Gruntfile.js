modules.exports = function(grunt){
  grunt.initCongif({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
    },

  mochaTest: {
  },

  nodemon: {
    dev: {
      script: 'server/server.js'
    }
  },

  uglify: {
  },

  jshint: {
    files: [
    ],
    options: {
      force: 'true',
      jshintrc: '.jshintrc',
      ignores: [
      ]
    }
  },

  cssmin: {
  },

watch: {
  scripts: {
    files: [
    ],
    tasks: [
        'concat',
      'uglify'
    ]
  },
  css: {
    files: 'client/*.css',
    tasks: ['cssmin']
  }
},

shell:{
  prodServer: {
  }
},
});

grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-mocha-test');
grunt.loadNpmTasks('grunt-nodemon');
grunt.loadNpmTasks('grunt-contrib-uglify'):
gurnt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-shell');

grunt.registerTask('server-dev', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
         cmd: 'grunt',
         grunt: true,
         args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);
  });


  grunt.registerTask('test', [
      'mochaTest'
    ]);

    grunt.registerTask('build', [
    ]);

    grunt.registerTask('upload', function(n) {
      if(grunt.option('prod')) {
        // add your production server task here
      } else {
        grunt.task.run([ 'server-dev' ]);
      }
    });

    grunt.registerTask('deploy', [
      // add your deploy tasks here
    ]);


  };
