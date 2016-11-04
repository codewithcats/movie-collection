var webpack = require('webpack');
var path = require('path');
var ExtractText = require('extract-text-webpack-plugin');

var config = {
    entry: {
        app: path.join(__dirname, 'src', 'js', 'app.js')
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'src', 'js'),
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.scss$/,
                include: path.join(__dirname, 'src', 'scss'),
                loader: ExtractText.extract('style', 'css!sass')
            }
        ]
    },
    plugins: [
        new ExtractText('[name].css')
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    devServer: {
        historyApiFallback: true,
        inline: true,
        port: 8081
    }
};

module.exports = config;