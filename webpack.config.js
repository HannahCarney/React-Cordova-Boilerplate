const path = require('path')
const webpack = require('webpack')
const DashboardPlugin = require('webpack-dashboard/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

require('dotenv').config()

/**
 * See: https://scotch.io/tutorials/setting-up-webpack-for-any-project
 * More: https://webpack.js.org/api/
 */

module.exports = {
	// WebPack Entry
	mode: 'development',
	context: path.resolve(__dirname, 'src'),
	entry: './app/index.js',
	//entry: `${__dirname}/src/app/index.js`,
	output: {
		path: `${__dirname}/www`, // TODO - Make `www`
		filename: 'bundle.js',
		publicPath: '', // Path for webserver root (in browser)
		pathinfo: true,
	},
	module: {
		rules: [
			// Babel 
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [ '@babel/preset-env' ]
					}			
				},
				exclude: [
					/node_modules/
				]
			},
			// Load "raw" HTML templates
			{
				test: /\.html/,
				loader: 'raw-loader'
			},
			{
				test: /\.(sass|scss)$/,
				use: [
					{ loader: 'style-loader' }, 	// Style nodes from JS strings
					{ loader: 'css-loader' }, 		// CSS to CommonJS
					{ loader: 'sass-loader' }, 		// Compiles S(A|C)SS to CSS
				],
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{ loader: 'css-loader' },
						{ loader: 'sass-loader' }
					],
				})
			},
		]
	},
	// Plugin array to apply to build chunk
	plugins: [
		new HtmlWebpackPlugin({
			template: `${__dirname}/src/public/index.html`,
			inject: 'body',
		}),
		new ExtractTextPlugin('styles.css'),
		new webpack.DefinePlugin({
			DEBUG_VALUE: JSON.stringify(process.env.DEBUG_VALUE)
		}),
		new DashboardPlugin(),
		new CopyWebpackPlugin([
			{
				from: 'public'
			}
		])
	],
	devServer: {
		contentBase: './src/public', // Source files of static assets
		port: 1337, // dev-server port
	}
}