const requireContext = require("./utils/server/require-context")
const pkg = require("../package.json")
const routerBase =
  process.env.DEPLOY_ENV === "GH_PAGES"
    ? {
        router: {
          base: pkg.name
        }
      }
    : {}
module.exports = {
  ...routerBase,
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      // if (ctx.isDev && ctx.isClient) {
      //   config.module.rules.push({
      //     enforce: "pre",
      //     test: /\.(js|vue)$/,
      //     loader: "eslint-loader",
      //     exclude: /(node_modules)/
      //   })
      // }
      config.module.rules.push({
        test: /\.md$/,
        use: [
          {
            loader: "html-loader"
          },
          {
            loader: "markdown-loader",
            options: {
              /* your options here */
            }
          }
        ]
      })
    }
  },
  generate: {
    dir: "../docs",
    //https://nuxtjs.org/guide/routing#dynamic-routes
    //Dynamic routes are ignored by the generate command (yarn generate). Nuxt does not know what these routes will be so it can't generate them.
    routes: (() => {
      const req = requireContext("./", "./dataSource/mds", true, /\.md$/)
      const routes = []
      for (let i = 0; i < req.keys().length; i++) {
        routes.push(`/${i + 1}`)
      }
      return routes
    })()
  }
}
