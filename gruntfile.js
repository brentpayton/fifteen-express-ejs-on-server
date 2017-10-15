module.exports = function(grunt) {

// Project Configuration
grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	uglify: {
		options: {
			banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
		},
		build: {
        	src: 'src/<%= pkg.name %>.js',
   	    	dest: 'build/<%= pkg.name %>.min.js'
		}
	},
	run: {
		//wget --no-verbose --show-progress --recursive --level inf --tries 3 --convert-links --no-host-directories --directory-prefix=temp --page-requisites --wait 2 --random-wait dev.fifteenlines.com

		wget: {
			cmd: 'wget',
			args: [
				'--no-verbose',
				// '--show-progress',
				'--recursive',
				// '--level=inf',
				// '--tries=3',
				'--convert-links',
				'--no-host-directories',
				'--directory-prefix=temp',
				'--page-requisites',
				// '--wait=2',
				'--adjust-extension',
				'--retry-connrefused',
				'--save-headers=off',
				'dev.fifteenlines.com'
			]
		},
		blc: {
			cmd: './node_modules/.bin/blc',
			args: [
				'https://dev.fifteenlines.com',
				'--filter-level 3 ',
				'--ordered ',
				'--recursive ',
				'--exclude *.php',
				'--verbose',
				'--follow'
			]
		}
	},
	htmllint: {
		all: {
			src: [ "temp/*.html", "temp/poems/*.html" ]
		},
		root: {
			src: "temp/*.html"
		},
	},
	bootlint: {
		options: {
			showallerrors: true
		},
		files: ['temp/*.html', 'temp/poems/*.html']
	},
	csslint: {
		src: ['temp/stylesheets/*.css']
	},
	linkChecker: {
		options: {
			maxConcurrency: 20
		},
	  default: {
	    site: 'dev.fifteenlines.com',
	    options: {
	      initialPort: 443
	    }
	  }
	}
});

	grunt.registerTask('test', function () {
	    var tasks = [
        'run:wget',
				'htmllint:all',
				'bootlint',
				'csslint'
	    ];

	    tasks.forEach(function (task) {
	        grunt.task.run(task);
	    });
	});

	// Load the plugin that profides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Default tasks.
	grunt.registerTask('default', ['uglify']);

	// grunt-html for linting html.
	grunt.loadNpmTasks('grunt-html');

	// grunt-run for calling executables, shell scripts, etc.  Needed in order to run wget in particular.
	grunt.loadNpmTasks('grunt-run');

	// Linter for twitter bootstrap.
	grunt.loadNpmTasks('grunt-bootlint');

	// Linter for css files
	grunt.loadNpmTasks('grunt-contrib-csslint');

	// Grunt dead link checker
	grunt.loadNpmTasks('grunt-link-checker');
};
