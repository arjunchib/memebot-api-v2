module.exports = {
  apps : [{
    name: "memebot-api",
    script: "./src/index.js",
    cwd: '.'
    env: {
      NODE_ENV: "production",
    }
  }]
}
