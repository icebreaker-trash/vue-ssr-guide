const apiMap = require('./api/nodeApiMap')()

Object.values(apiMap).forEach(async fn => {
  try {
    console.log(`${await fn()} fn has been resolved`)
  } catch (error) {
    console.log(`${error} fn has been rejected`)
  }
})