/* global require, module, __dirname */
const path = require('path');

module.exports = ({
    port,
    publicPath,
    rootFolder,
    https
} = {}) => {
    const config = {
        entry: path.resolve(__dirname, '../src/entry-dev.js'),
        output: {
            filename: 'js/[name].[fullhash].js',
            path: `${rootFolder || ''}/dist/apps/advisor`,
            publicPath,
            chunkFilename: 'js/[name].[fullhash].js'
        },
        module: {
            rules: [{
                test: /src\/.*\.js$/,
                exclude: /(node_modules|bower_components)/i,
                use: [{ loader: 'babel-loader' }]
            }, {
                test: /src\/.*\.tsx?$/,
                loader: 'ts-loader',
                exclude: /(node_modules)/i
            }, {
                test: /\.s?[ac]ss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }, {
                test: /\.(woff(2)?|ttf|jpg|png|eot|gif|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            },
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: 'javascript/auto'
            }]
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.mjs', '.js', '.scss'],
            alias: {
                customReact: 'react',
                PFReactCore: '@patternfly/react-core',
                PFReactTable: '@patternfly/react-table'
            },
            fallback: {
                stream: require.resolve('stream-browserify'),
                zlib: require.resolve('browserify-zlib'),
                assert: require.resolve('assert/'),
                path: require.resolve('path-browserify'),
                buffer: require.resolve('buffer/')
            }
        },
        devServer: {
            contentBase: `${rootFolder || ''}/dist`,
            hot: true,
            port: port || 8002,
            https: https || false,
            inline: true,
            disableHostCheck: true,
            historyApiFallback: true,
            writeToDisk: true,
            clientLogLevel: 'debug'
        }
    };

    return config;
};
