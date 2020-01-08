const path = require("path")
let _uid = 0
function getFileName(p, withExt = false) {
  if (typeof p === "undefined") return _uid++
  return path.basename(p, withExt ? undefined : path.extname(p))
}

function generate(ms, fn, rejectFlag = false) {
  if (typeof fn === "boolean") {
    rejectFlag = fn
  }
  return () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        fn()
        rejectFlag ? reject(ms) : resolve(ms)
      }, ms)
    })
  }
}

module.exports = {
  getFileName,
  gen: generate
}
