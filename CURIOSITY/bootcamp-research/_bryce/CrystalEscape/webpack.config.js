module.exports = {
	entry: './lib/crystal_escape.js',
	output: {
		path: __dirname,
		filename: './bundle.js'
	},
	module: {
		rules: [{ test: /\.css$/, loader: 'style!css' }]
	},
	devtool: 'source-map'
};
