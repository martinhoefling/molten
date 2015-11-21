var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
webpackConfig.devtool = 'inline-source-map';

module.exports = function (config) {
    config.set({
        basePath: '.',
        frameworks: ['jasmine-ajax', 'jasmine'],
        files: [
            'tests/tests.bundle.js'
        ],
        exclude: [],
        preprocessors: {
            'tests/tests.bundle.js': ['webpack', 'sourcemap']
        },
        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine-ajax',
            'karma-jasmine',
            'karma-sourcemap-loader',
            'karma-webpack'
        ],
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        browsers: ['Firefox', 'Chrome'],
        singleRun: true,
        concurrency: Infinity,
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true //please don't spam the console when running in karma!
        }
    });
};
