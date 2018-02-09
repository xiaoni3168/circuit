const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },
    module: {
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
				test: /\.(scss|sass)$/,
				loaders: ['style-loader', 'css-loader?sourceMap','sass-loader?sourceMap&sourceComments']
			},
			{
				test: /\.css$/,
				loaders: ['style-loader?sourceMap', 'css-loader?sourceMap']
			}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['app'],
            filename: 'index.html',
            template: 'index.html',
            inject: 'body'
        })
    ],
    devtool: 'source-map',
    devServer: {
        host: '0.0.0.0',
        port: '9999'
    }
}