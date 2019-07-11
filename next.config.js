/* eslint-disable */
const withCSS = require('@zeit/next-css');
const withTypescript = require('@zeit/next-typescript');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

require('dotenv').config();

const GITHUB = process.env.DEPLOY_ENV === 'github';
const PROJ_NAME = process.env.PROJ_NAME;

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = file => {};
}

module.exports = withCSS(
  withBundleAnalyzer(
    withTypescript({
      // exportPathMap: function() {
      //   return {
      //     '/': { page: '/' },
      //   };
      // },
      assetPrefix: GITHUB ? `/${PROJ_NAME}/` : '',
      analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
      analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
      bundleAnalyzerConfig: {
        server: {
          analyzerMode: 'static',
          reportFilename: '../bundles/server.html',
        },
        browser: {
          analyzerMode: 'static',
          reportFilename: '../bundles/client.html',
        },
      },
      webpack: (config, { isServer, buildId, dev }) => {
        config.plugins = config.plugins || [];
        config.resolve.extensions = config.resolve.extensions.concat(['.less']);

        config.plugins = [
          ...config.plugins,

          // Read the .env file
          new Dotenv({
            path: path.join(__dirname, '.env'),
            systemvars: true,
          }),
        ];

        return config;
      },
    }),
  ),
);
