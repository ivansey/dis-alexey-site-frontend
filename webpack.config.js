const path = require("path");
const TerserJsPlugin = require("terser-webpack-plugin");

module.exports = {
	entry: "./src/index.js",
  	mode: "development",
	output: {
		path: path.join(__dirname, "/dist"),
		filename: "index.js",
	},
	devServer: {
		static: {
			directory: path.join(__dirname, "dist"),
		},
		compress: true,
		port: 3000,
		historyApiFallback: true,
		proxy: {
			"/api/**": {
				target: "http://[::1]:3001/",
				pathRewrite: {"^/api": ""},
				secure: false,
       			changeOrigin: true
			}
		}
	},

	optimization: {
		minimize: true,
  		minimizer: [
	    	new TerserJsPlugin({
	      		parallel: true,
	    	})
	  	]
	},

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules)/,
				use: [
					{
						loader: "cache-loader",
						options: {
							cacheDirectory: path.resolve(
								__dirname,
								"./node_modules/.cache/cache-loader"
							)
						}
					},
					"babel-loader"
				]
			},
			{
				test: /\.css$/,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							modules: true,
						}
					},
					{
						loader: "cache-loader",
						options: {
							cacheDirectory: path.resolve(
								__dirname,
								"./node_modules/.cache/cache-loader"
							)
						}
					},
				]
			},
			{
				test: /\.s[ac]ss$/,
				use: [
					"style-loader",
					"css-loader",
					"sass-loader",
					{
						loader: "cache-loader",
						options: {
							cacheDirectory: path.resolve(
								__dirname,
								"./node_modules/.cache/cache-loader"
							)
						}
					},
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					"file-loader",
					{
						loader: "cache-loader",
						options: {
							cacheDirectory: path.resolve(
								__dirname,
								"./node_modules/.cache/cache-loader"
							)
						}
					},
				]
			}
		]
	},


}