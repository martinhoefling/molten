module.exports = {
    context: __dirname + '/app',
    entry: ['./app.jsx'],
    output: {
        filename: 'molten.js',
        path: './dist',
        publicPath: 'assets'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
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
    devtool: '#source-map',
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
};
