(() => {
	'use strict';

	console.log('This is the clean way to use strict mode.');
})();

function strictLog() {
	'use strict';

	console.log('This use strict is only happening in this function.');
}

strictLog();
