var config = {
    "base_url": "http://uyuzvw.natappfree.cc",
    "ws_url": "ws://uyuzvw.natappfree.cc",
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