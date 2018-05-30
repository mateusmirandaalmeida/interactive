const path = require('path');

module.exports = {
	context: __dirname,
	entry: {
		bundle: path.join(__dirname, '../src', 'index')
	},
	plugins: [],
	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},
	externals: {
		"Phaser": "Phaser"
	},
	module: {
		rules: [
			{
				test: /\.(html)$/,
				use: 'html-loader'
			},
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.(jpe?g|png|gif|svg|eot|woff2|woff|ttf)$/i,
				use: 'file-loader?name=assets/[name].[ext]'
			}
		]
	}
};