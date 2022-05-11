const path = require('path')

module.exports = {
  env: {
    APP_ENV: 'production'
  },
  productionBrowserSourceMaps: true,
  typescript: {
    // ignoreBuildErrors: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "vars.scss";@import "mixins.scss";`
  },
  webpack: config => {
    config.resolve.alias['@'] = path.resolve(__dirname)
    return config
  },
  images: {
    // domains: ['test-img.algobuy.net', 'img.algobuy.net'],
  },
  async rewrites() {
    return {
      fallback: [
        {
          source: '/backend-api/:path*',
          // destination: 'https://uat-myshoplus.algobuy.net/:path*'
          destination: 'https://pub-test-api-shoplus.algobuy.net/:path*'
          // destination: 'https://test-myshoplus.algobuy.net/:path*'
          // destination: 'https://tree-myshoplus.algobuy.net/:path*'
          // destination: 'https://rorolulu.com/:path*',
        }
      ]
    }
  }
}
