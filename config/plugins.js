/* global require, module, __dirname  */
const webpack = require('webpack');
const path = require('path');

module.exports = ({
    appDeployment,
    htmlPlugin,
    replacePlugin
} = {}) => {
    const HtmlWebpackPlugin = new(require('html-webpack-plugin'))({
        title: 'My App',
        filename: path.resolve(__dirname, '../dist/index.html'),
        template: path.resolve(__dirname, '../src/index.html'),
        ...htmlPlugin || {}
    });

    const HtmlReplaceWebpackPlugin = new(require('html-replace-webpack-plugin'))([
        {
            pattern: '@@env',
            replacement: appDeployment || ''
        },
        ...replacePlugin || []
    ]);

    const EnvPlugin = new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer']

    });

    return [
        EnvPlugin,
        HtmlWebpackPlugin,
        HtmlReplaceWebpackPlugin
    ];
};

