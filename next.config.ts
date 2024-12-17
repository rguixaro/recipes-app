import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	pageExtensions: ['ts', 'tsx'],
	experimental: {
		optimizePackageImports: ['lucide-react'],
	},
};

export default nextConfig;