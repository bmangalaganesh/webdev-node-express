module.exports = function(grunt){ // load plugins
	[
	'grunt-cafe-mocha',
	'grunt-contrib-jshint',
	'grunt-exec',
	].forEach(function(task){ grunt.loadNpmTasks(task);
});

// configure plugins
grunt.initConfig({
        cafemocha: {
                all: { src: 'qa/tests-*.js', options: { ui: 'tdd' }, }
        		  },
        jshint: {
                app: ['startapp.js', 'public/js/**/*.js',
                        'lib/**/*.js'],
                        
        qa: ['Gruntfile.js', 'public/qa/**/*.js', 'qa/**/*.js'],
        },
    
       //Un-comment these lines after installing linkchecker
       //TODO - Paramterize the hardcoded URLs
       // exec: {
       // 	linkchecker:
       // 		{ cmd: 'linkchecker http://localhost:3000' }
       // 	   },
    });


// register tasks
//grunt.registerTask('default', ['cafemocha','jshint','exec']);

//add the exec as a task once the link check is installed...

grunt.registerTask('default', ['cafemocha','jshint']);


};

