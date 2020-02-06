const webpack = require('webpack')

module.exports = {
  target: 'webworker',
  entry: './index.js',
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.MJ_APIKEY_PUBLIC': JSON.stringify(
        process.env.MJ_APIKEY_PUBLIC,
      ),
      'process.env.MJ_APIKEY_PRIVATE': JSON.stringify(
        process.env.MJ_APIKEY_PRIVATE,
      ),
      'process.env.TO_EMAIL': JSON.stringify(process.env.TO_EMAIL),
      'process.env.FROM_EMAIL': JSON.stringify(process.env.FROM_EMAIL),
      'process.env.RECAPTCHA_SECRET': JSON.stringify(
        process.env.RECAPTCHA_SECRET,
      ),
    }),
  ],
}
