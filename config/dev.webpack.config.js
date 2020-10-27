/* global require, module, __dirname */
const { resolve } = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const config = require('@redhat-cloud-services/frontend-components-config');
const { config: webpackConfig, plugins } = config({
    rootFolder: resolve(__dirname, '../'),
    debug: true,
    htmlPlugin: {
        inject: false
    }
});

const jsonpFunction = 'webpackAdvisorJSONP';
module.exports = (env) => {
    env && env.analyze === 'true' && plugins.push(new BundleAnalyzerPlugin());

    webpackConfig.output.filename = 'js/advisor.js';
    webpackConfig.externals = {
        react: 'React',
        'react-dom': 'ReactDOM'
    };
    webpackConfig.output.jsonpFunction = jsonpFunction;
    delete webpackConfig.optimization.splitChunks;

    // console.log(plugins.splice(6, 1));
    return { ...webpackConfig, plugins };
};
