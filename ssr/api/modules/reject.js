const {
  getFileName,
  gen
} = require('../util')
const fileName = getFileName(__filename)

;
[1500, 2500, 3500].forEach(x => {
  module.exports[fileName + x] = gen(x, () => {
    console.log(`${x} ${fileName}  has been called`)
  }, true)
})