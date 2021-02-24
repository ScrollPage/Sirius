const path = require('path');
const withPWA = require('next-pwa')

const nextConfig = {
	pwa: {
		disable: process.env.NODE_ENV === 'development',
		// dest: 'public', // comment out this line
		register: true,
		sw: '/sw.js'
	},
	webpack: config => {
		config.resolve.alias['@'] = path.resolve(__dirname);
		return config;
	},
};


module.exports = withPWA(nextConfig)