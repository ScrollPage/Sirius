const path = require('path');
const Dotenv = require('dotenv-webpack');
const withCSS = require('@zeit/next-css');
const { locales, defaultLocale } = require('./i18n.json')

const localeSubpaths = {
	en: 'en',
	ru: 'ru',
}

module.exports = withCSS();

module.exports = {
	i18n: {
		locales,
		defaultLocale,
	},
	webpack: config => {
		config.resolve.alias['@'] = path.resolve(__dirname);
		config.plugins.push(new Dotenv({ silent: true }));
		return config;
	},
};
