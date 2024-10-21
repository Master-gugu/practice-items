var config = {
    // "base_url": "http://th57g8.natappfree.cc",
    "base_url": "https://192.168.2.33:9090",
    // "ws_url": "ws://th57g8.natappfree.cc",
    "ws_url": "ws://192.168.2.33:9090",
}

try {
	if (window) {
		window.config = window.config
			? Object.assign(config, window.config)
			: config;
		config = window.config;
	}
} catch (e) {
	console.log(e);
}

try {
	exports.config = config;
} catch (e) {
	console.log(e);
}