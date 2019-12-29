const requireContext = require("./utils/server/require-context")
const pkg = require("../package.json")
const routerBase =
  process.env.DEPLOY_ENV === "GH_PAGES"
    ? {
        router: {
          base: `/${pkg.name}/`
        }
      }
    : {}
module.exports = {
  mode: "universal",
  modern: process.env.NODE_ENV === "production",
  head: {
    title: "Vue SSR Guide and Practice",
    meta: [
      {
        charset: "utf-8"
      },
      {
        "http-equiv": "X-UA-Compatible",
        content: "IE=edge, chrome=1"
      },
      {
        hid: "description",
        name: "description",
        content: "Vue SSR Guide and Practice"
      },
      {
        hid: "viewport",
        name: "viewport",
        content:
          "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, minimal-ui"
      }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      }
    ],
    script: [],
    noscript: [
      {
        innerHTML: "The page need javascript"
      }
    ]
  },
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
