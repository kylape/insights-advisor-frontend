/* global require, module, __dirname  */
const webpack = require('webpack');
const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('../package.json').dependencies;

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

    const ModuleFederation = new ModuleFederationPlugin({
        name: 'advisor',
        remotes: {
            insightsChrome: 'insightsChrome@https://ci.foo.redhat.com:1337/apps/chrome/js/chrome-remote.js'
        },
        shared: {
            react: { singleton: true, requiredVersion: deps.react },
            'react-dom': { singleton: true, requiredVersion: deps['react-dom'] }
        }
    });

    return [
        EnvPlugin,
        ModuleFederation,
        HtmlWebpackPlugin,
        HtmlReplaceWebpackPlugin
    ];
};

