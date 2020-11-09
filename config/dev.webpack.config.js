/* global require, module, __dirname */
const fs = require('fs');
const { resolve } = require('path');
const config = require('./config');

const rootFolder = resolve(__dirname, '../');

const { insights } = require(`${rootFolder}/package.json`);

const getAppEntry = (rootFolder, isProd) => {
    const jsAppEntry = isProd ? `${rootFolder}/src/entry.js` : `${rootFolder}/src/entry-dev.js`;
    const tsAppEntry = isProd ? `${rootFolder}/src/entry.tsx` : `${rootFolder}/src/entry-dev.tsx`;
    if (fs.existsSync(jsAppEntry)) {
        return jsAppEntry;
    }

    if (fs.existsSync(tsAppEntry)) {
        return tsAppEntry;
    }

    return jsAppEntry;
};

const appDeployment = 'apps';

const publicPath = `/${appDeployment}/${insights.appname}/`;
const appEntry = getAppEntry(rootFolder, process.env.NODE_ENV === 'production');

const res = config({
    rootFolder,
    debug: true,
    appDeployment,
    insights,
    publicPath,
    appEntry
});
const plugins = require('./plugins');
const c = {
    ...res,
    plugins: plugins({ rootFolder, debug: true,
        appDeployment,
        insights,
        publicPath
    })
};

module.exports = c;
