import type { Configuration } from 'webpack'
import type { NextConfig } from 'next'

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  webpack: (config: Configuration) => {
    config.resolve = config.resolve ?? {}
    config.resolve.fallback = {
      async_hooks: false,
      fs: false,
      child_process: false,
      os: false,
      path: false,
    }
    return config
  },
}

module.exports = nextConfig
