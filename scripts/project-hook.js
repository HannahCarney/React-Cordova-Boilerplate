var pluginHook = require('./pluginHook');
	var npmInstall = require('./npmInstall');

	return npmInstall(context).then(function() {
		return pluginHook(context);
	});