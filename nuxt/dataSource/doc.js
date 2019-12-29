import order from "./order"
const docsContext = require.context("./mds", true, /\.md$/)
const docKeys = docsContext.keys()
export default order(docKeys).map(docsContext)
