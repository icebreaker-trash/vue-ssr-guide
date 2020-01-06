const apiContext = require.context("./modules", false, /\.js$/)

const moduleArray = apiContext.keys().map(x => apiContext(x))

const map = moduleArray.reduce((acc, cur) => {
  Object.entries(cur).forEach(([k, v]) => {
    acc[k] = v
  })
  return acc
}, {})

export default map
