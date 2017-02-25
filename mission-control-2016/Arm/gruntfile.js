module.exports = function (grunt) {

	var webpack = require("webpack");

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		'primus': {
			dest: 'build/primus.js',
			options: {
				transformer: 'websockets'
			}
		},
		'webpack': {
			options: {
				entry: "./src/index.js",
				output: {
					path: "./build",
					filename: "bundle.js",
				    publicPath: "/assets/"
				},
				module: {
					loaders: [
						{ test: /\.jsx$/, exclude: /node_modules/, loader: "babel-loader"},
						{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
					]
				},
				plugins:[
					new webpack.HotModuleReplacementPlugin()
				],
				devtool: "#source-map",
				inline: true
			},
			default: {
				watch: false,
				keepalive: false
			},
			watch: {
				watch: true,
				keepalive: true,
				failOnError: false
			}
		},
		'webpack-dev-server': {
			test: {
				webpack: {
					entry: "./src/index.js",
					output: {
						path: "./build",
						filename: "bundle.js"
					},
					module: {
						loaders: [
							{ test: /\.jsx$/, exclude: /node_modules/, loader: "babel-loader"},
							{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
						]
					},
					plugins:[
						new webpack.HotModuleReplacementPlugin()
					],
					devtool: "#source-map"
				},
				host: "localhost",
				inline: true,
			    publicPath: "/build/",
				keepAlive: true
			}
		}
	})

	grunt.loadNpmTasks('grunt-webpack');

	/* */
	var Primus = require('primus');

	grunt.registerMultiTask('primus', 'generate primusjs client library', function () {
		var server = require('http').createServer(function(req, res){ });
		var primus = new Primus(server, this.options());
		var js = primus.library();

		grunt.file.write(this.data, js, {encoding: 'utf8'});
	});


	// grunt.registerTask('default', ['primus', 'webpack:watch']);
	grunt.registerTask('default', ['primus', 'webpack-dev-server']);
	grunt.registerTask('server', ['primus', 'webpack-dev-server']);

}