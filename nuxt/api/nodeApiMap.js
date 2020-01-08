module.exports = () => {
  const requireContext = require("./require-context")
  const oo = requireContext("./api", "modules", false, /\.js$/)
  const moduleArray = oo.keys().map(oo)
  return moduleArray.reduce((acc, cur) => {
    Object.entries(cur).forEach(([k, v]) => {
      acc[k] = v
    })
    return acc
  }, {})
}
