const testsContext = require.context("./mds", true, /\.md$/)
const copy = []
testsContext.keys().forEach(md => copy.push(testsContext(md)))
export default copy
