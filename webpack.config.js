const path = require("path");
const TerserJsPlugin = require("terser-webpack-plugin");

require("dotenv").config({path: "./.env"});

let HOST, HTTPS = null;

if (!process.env.HOST) {
	HOST = "all";
} else {
	HOST = process.env.HOST;
}

if (!process.env.HTTPS) {
	HTTPS = false;
} else {
	HTTPS = {
        key: process.env.KEY,
        cert: process.env.CERT,
		cacert: process.env.CACERT,
        requestCert: true,
    };
}

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
		allowedHosts: [HOST],
        compress: true,
        port: !HTTPS ? 80 : 443,
        https: HTTPS,
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
				test: /\.(png|svg|jpg|gif|webp)$/,
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

	
};