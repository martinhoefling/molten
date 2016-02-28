var webpack = require('webpack');
var path = require('path');

module.exports = {
    context: __dirname,
    entry: [
	'webpack-hot-middleware/client',
	'./app/app.jsx'
    ],
    output: {
        filename: 'molten/molten.js',
        path: path.join(__dirname, 'dist'),
        publicPath: '/assets'
    },
    module: {
        preLoaders: [
            {
                test: /\.jsx$|\.js$/,
                loader: 'eslint-loader',
                include: __dirname + '/app'
            }
        ],
        loaders: [
            {
                test: /\.jsx$|\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react', 'react-hmre']
                }
            },
            {
                test: /\.less$/,
                loader: 'style!css!less'
            },
            {
                test: /\.png$/,
                loader: 'url-loader?limit=100000&mimetype=image/png'
            }
        ]
    },
    resolve: {
        alias: {
            react: __dirname + '/node_modules/react',
            'react/addons': __dirname + '/node_modules/react/addons'
        },
        root: __dirname + '/app',
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ['node_modules']
    },
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};
