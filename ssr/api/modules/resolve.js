const {
  getFileName,
  gen
} = require('../util')
const fileName = getFileName(__filename)

;
[1000, 2000, 3000].forEach(x => {
  module.exports[fileName + x] = gen(x, () => {
    console.log(`${x} ${fileName}  has been called`)
  })
})