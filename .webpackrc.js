const path = require('path');

export default {
  entry: 'src/index.js',
  extraBabelPlugins: [
    //'transform-decorators-legacy',
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
  ],
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
      NODE_ENV: '"development"'
    },
    production: {
      NODE_ENV: '"production"'
    }
  },
  alias: {
    'components': path.resolve(__dirname, 'src/components/'),
    'assets': path.resolve(__dirname, 'src/assets/'),
    'utils': path.resolve(__dirname, 'src/utils/'),
  },
  ignoreMomentLocale: true,
  theme: './src/theme.js',
  // html: {
  //   template: './src/index.ejs',
  // },
  publicPath: '/',
  disableDynamicImport: true,
  hash: true,
  proxy: {
    '/api': {
        target: "http://test-follow-up.rubikstack.com/",
        changeOrigin: true,
        pathRewrite: {
            "^/api": ""
        },
        secure: false,
        headers: {
            "Host": "test-follow-up.rubikstack.com:443",
            "Referer": "http://test-follow-up.rubikstack.com"
        }
    }
  }
};
