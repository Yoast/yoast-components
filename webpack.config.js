const path = require( "path" );

module.exports = {
	entry: "./main.js",
	output: {
		path: __dirname,
		filename: "index.js",
	},
	devServer: {
		inline: true,
		port: 3333,
		historyApiFallback: true,
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [ "babel-loader" ],
			},
			{
				test: /\.json$/,
				use: [ "json-loader" ],
			},
			{
				test: /\.svg$/,
				use: [ {
					loader: "svg-react-loader",
					options: {
						stripdeclarations: true,
					},
				} ],
			},
		],
	},
	resolve: {
		extensions: [ ".json", ".jsx", ".js", ".svg" ],
	},
};
