const path = require('path');
const Dotenv = require('dotenv-webpack');
const withCSS = require('@zeit/next-css');
// const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

module.exports = withCSS();

module.exports = {
	webpack: config => {
		config.resolve.alias['@'] = path.resolve(__dirname);
		config.plugins.push(new Dotenv({ silent: true }));
		return config;
	},
	images: {
		domains: ['business-net-pictures.s3.eu-north-1.amazonaws.com'],
	},
};
