/*eslint-disable*/
var path = require("path");

module.exports = {
	entry: ['babel-polyfill', './src/routes.js'],
	output: {
		filename: "bundle.js",
		path: "./public"
	},
	resolve: {
		alias: {
			src: path.resolve('./src'),
			styleHub: path.resolve('./src/composable-styles/style.hub.js')
		}
	},
	module: {
		loaders: [
			{test: /\.js$/, exclude: /node_modules/, loader: "babel"},
			{test: /\.css$/, exlude: /node_modules/, loader: "style!css"},
			{test: /\.jpg/, exlude: /node_modules/, loader: "file"},
			{test: /\.otf/, exlude: /node_modules/, loader: "file"},
		]
	},
	devtool: "sourcemaps"
}
