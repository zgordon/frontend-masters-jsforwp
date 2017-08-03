var path = require('path');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');


module.exports = {
  entry: ['./src/theme.js'],
  output: {
    filename: 'min.theme.js',
    path: path.resolve( __dirname, 'dist')
  },
  devtool: "cheap-eval-source-map",
	devServer: {
		port: 9000,
		contentBase: path.join(__dirname, 'dist')
	},
	module: {
	  rules: [
	    {
	      test: /\.js$/,
	      exclude: /(node_modules)/,
	      loader: 'babel-loader',
	      query: {
	        presets: ['es2015']
	      }
	    }
	  ]
	},
	plugins: [
    new UglifyJSPlugin(),
    new BrowserSyncPlugin({
      // Load localhost:3333 to view proxied site
      // Change proxy to your local WordPress URL
      host: 'localhost',
      port: '3333',
      proxy: 'https://vagrant.local'
    })
  ]
};
