const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const path = require('path');
const outputDirectory = 'dist';

const webpackConfig = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, outputDirectory),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin([outputDirectory]),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new ExtractTextPlugin('styles.css'),
        new SWPrecacheWebpackPlugin({
            filename: 'service-worker.js',
            navigateFallback: '/index.html',
            staticFileGlobs: ['dist/*.{js,html,css}'],
            minify: true,
            stripPrefix: 'dist/',
            runtimeCaching: [
                {
                    urlPattern: /^https:\/\/(fonts|maps)\.googleapis\.com\//,
                    handler: 'cacheFirst'
                },
                {
                    urlPattern: /^https:\/\/maps\.gstatic\.com\//,
                    handler: 'cacheFirst'
                },
                {
                    urlPattern: /^https?:\/\/localhost:8080\/api\//,
                    handler: 'cacheFirst'
                }
            ]
        })
    ]
};

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        webpackConfig.plugins.unshift(new webpack.HotModuleReplacementPlugin());
        webpackConfig.devServer = {
            port: 3000,
            open: true,
            proxy: {
                '/api': 'http://localhost:8080'
            }
        };
    }
    return webpackConfig;
};
