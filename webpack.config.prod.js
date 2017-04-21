module.exports = {
    context: __dirname,
    entry: ['./app/app.jsx'],
    output: {
        filename: 'molten.js',
        path: __dirname + '/release/molten',
        publicPath: 'assets'
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "eslint-loader"
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
                    presets: ['es2017', 'react']
                }
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
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
        extensions: ['.js', '.jsx'],
        modules: ['node_modules', __dirname + '/app']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
};
