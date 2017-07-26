module.exports = {
	entry: './main.js',
	output: {
		path: __dirname,
		filename: 'index.js'
	},
	devServer: {
		inline: true,
		port: 3333
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: [ 'es2015', 'react' ]
				}
			},
			{
				test: /\.json$/
			}
		]
	},
	resolve: {
		extensions: ['.json', '.jsx', '.js']
	}
};
