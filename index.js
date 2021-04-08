const os = require("os");
const process = require("process");
const path = require("path");

exports.init = function(node, app_config, main) {
	node.announce([{
		"type": "systeminfo.info"
	}, app_config.metadata]);

	var cpus = os.cpus();

	var main = {};
	try {
		var packagefile = path.dirname(require.main.filename)
					+ "/package.json";
		main = require(packagefile);
	} catch(err) {
		console.error("Error", err);
	}

	node.publish(undefined, {
		locale: Intl.DateTimeFormat().resolvedOptions().locale,
		language: Intl.DateTimeFormat().resolvedOptions().locale.
		                replace(/-.*$/, ""),
		timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		cpu: cpus[0].model,
		cpu_count: cpus.length,
		cpu_arch: os.arch(),
		os_type: os.type(),
		os_platform: os.platform(),
		os_release: os.release(),
		os_version: os.version ? os.version() : undefined,
		total_mem: Math.round(os.totalmem() / 1024 / 1024),
		hostname: os.hostname(),
		network_interfaces: Object.keys(os.networkInterfaces())
				.filter(interface => interface !== "lo"),
		cwd: process.cwd(),
		node_version: process.version,
		main_name: main.name,
		main_version: main.version,
	}, undefined, true);

	return [node];
};
