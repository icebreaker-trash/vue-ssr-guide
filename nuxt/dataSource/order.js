//https://github.com/vuejs/vue-ssr-docs/blob/master/docs/.vuepress/config.js

/**
 *
 * @param {array} targetArray
 * @param {string} defaultName
 */
function fillPath(targetArray, defaultName = "README.md") {
  return targetArray.map(x => {
    if (x[x.length - 1] === "/") {
      x += defaultName
    }
    return x
  })
}
export const include = fillPath([
  "/zh/",
  "/zh/guide/",
  "/zh/guide/universal",
  "/zh/guide/structure",
  "/zh/guide/routing",
  "/zh/guide/data",
  "/zh/guide/hydration",
  "/zh/guide/bundle-renderer",
  "/zh/guide/build-config",
  "/zh/guide/css",
  "/zh/guide/head",
  "/zh/guide/caching",
  "/zh/guide/streaming",
  "/zh/guide/non-node"
])
export const exclude = fillPath(["/zh/api/"])

/**
 *
 * @param {Array<string>} keys
 */
export default keys => {
  include.forEach((str, idx) => {
    for (let i = idx; i < keys.length; i++) {
      const key = keys[i]
      if (key.includes(str)) {
        let tmp = keys[idx]
        keys[idx] = key
        keys[i] = tmp
      }
    }
  })
  return keys
}
