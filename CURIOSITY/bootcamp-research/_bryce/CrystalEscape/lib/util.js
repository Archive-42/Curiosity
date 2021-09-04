const Util = {
	throttle: (func, limit) => {
		let throttled;
		return (...args) => {
			if (!throttled) {
				func(...args);
				throttled = true;
				setTimeout(() => (throttled = false), limit);
			}
		};
	}
};

module.exports = Util;
