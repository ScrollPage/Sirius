const path = require('path');
const withPWA = require('next-pwa')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
})

const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);

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

const withCompose = compose(withPWA, withBundleAnalyzer)

module.exports = withCompose(nextConfig)
