# vue-ssr-guide

Vue SSR Guide and Practice

# Getting start

For Development Environment

```sh
    # install packages
    npm install

    # run nuxt dev server
  	# then open you browser at http://localhost:10923/
  	# you can change your port in nuxt/server/index.js
    npm run dev
    
```

For Production Deployment

```sh
    # build
    npm run build

	# run node server
    npm run start
```

For Static Generated Deployment

```sh
    # generate static files
    npm run generate
```

- Goals:
  - Nuxt demo
  - raw vue-server-renderer usage
  - compare with other engine like ejs,pug,mustache
  - SPA inside SSR
  - server side cache examples (page-cache,component-cache,api-cache)
  - external library usage with process.[env] and webpack (need window,document,global object)
  - CPU-intensive render optimization (Node,js version >= 12)

<!-- - TODOs:
	- [ ] -->
- Target:
  - [50%] Nuxt demo

# Refer
<https://ssr.vuejs.org>
