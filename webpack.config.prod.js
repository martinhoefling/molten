var webpack = require('webpack');

module.exports = {
    context: __dirname,
    entry: ['./app/app.jsx'],
    output: {
        filename: 'molten.js',
        path: './release/molten',
        publicPath: 'assets'
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
                    presets: ['es2015', 'react']
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
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
};
