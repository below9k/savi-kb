Package.describe({
	name: 'savi:user-management',
	summary: 'SAVI Controls User/Dealer Account Backend',
	version: '1.0.0',
	git: '/* Github */'
});

Package.onUse(function(api) {
	api.versionsFrom('1.0.3.2');
	api.use(['templating','cryptoquick:stylus-multi'], 'client');
	api.use(['mongo', 'iron:router'], ['client', 'server']); // Stylus-multi: Stylus and Rupture + Nib (passive - used) and Jeet (unused)
    api.use(['accounts-base','email'],'server');

	var options = {
		files: {
			both: [
				'router.js',
				'collections.js'
			],
			client: [
				'userManagement.html',
				'userManagement.js',
				'userManagement.styl'
			],
			server: [
				'publish.js',
                'methods.js',
                'email.js'
			]
		},
		exports: [
			'dealers',
            'roles'
		]
	};

	// Call api.addFiles on each file in the 'options.files' tree above
	var groups = [{
		name: 'both',
		where: ['client', 'server']
	}, {
		name: 'client',
		where: ['client']
	}, {
		name: 'server',
		where: ['server']
	}];

	for (var i in groups) {
		for (var j in options.files[groups[i].name]) {
			api.addFiles(groups[i].name + '/' + options.files[groups[i].name][j], groups[i].where);
		}
	}

	// Call api.export on each 'options.exports' above
	for (var i in options.exports) {
		api.export(options.exports[i]);
	}
});

Package.onTest(function(api) {
	api.use('tinytest');
	api.use('savi:user-management');
	api.addFiles('tests.js');
});