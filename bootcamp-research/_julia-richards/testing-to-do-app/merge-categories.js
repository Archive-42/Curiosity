const handlebars = require("handlebars");

function mergeCategories(template, categories, tagName) {
	const render = handlebars.compile(template);
	return render({ categories });
}

exports.mergeCategories = mergeCategories;
