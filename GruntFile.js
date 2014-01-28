module.exports = function (grunt) {
    grunt.initConfig({

    // define source files and their destinations
    uglify: {
        files: { 
            src: ['public/js/vendors/jquery.js','public/js/vendors/underscore.js','public/js/vendors/backbone.js','public/js/vendors/swig.js','/js/init.js','/js/app/models.js','/js/app/collections.js','/js/app/views.js','/js/app/app.js'],  // source files mask
            dest: 'public/js/dependencies.min.js'    // destination folder
            //expand: true,    // allow dynamic building
            //flatten: true,   // remove all unnecessary nesting
            //ext: '.min.js'   // replace .js to .min.js
        }
    }
/*
    ,
    watch: {
        js:  { files: 'public/js/*.js', tasks: [ 'uglify' ] },
    }
    */
});

// load plugins
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-uglify');

// register at least this one task
grunt.registerTask('default', [ 'uglify' ]);


};


