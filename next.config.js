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
        config.plugins = [
          ...config.plugins,

          // Read the .env file
          new Dotenv({
            path: path.join(__dirname, '.env'),
            systemvars: true,
          }),
        ];

        // react-icons issue @see https://github.com/react-icons/react-icons/issues/154#issuecomment-412774515
        config.resolve.extensions = ['.mjs', ...config.resolve.extensions];

        return config;
      },
    }),
  ),
);
