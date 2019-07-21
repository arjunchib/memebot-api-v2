module.exports = {
  apps: [
    {
      name: 'memebot-api',
      script: './src/index.js',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}
