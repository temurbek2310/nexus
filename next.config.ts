import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'qp4b1hb3ha.ufs.sh',
			},
		],
	},
}

export default nextConfig
