title: Vue服务端渲染的探索与实践
speaker: icebreaker
prismTheme: solarizedlight
plugins:
    - echarts

<slide class="bg-black-blue aligncenter" >

# Vue服务端渲染的探索与实践 {.text-landing.text-shadow}

By icebreaker {.text-intro}

<slide :class="size-30 aligncenter">

## 历史背景

---

随着前端技术的发展，前端开发的边界正逐渐被推向后端，两者的界限在重合与分离中不断交替。回首过往，Node.js在2009年的横空出世可以看作前端开发的里程碑事件，从此JavaScript不在局限于浏览器的狭窄空间，开始在服务器的广阔天空上展翅高飞。

<slide :class="size-30 aligncenter">

# 首先

---

## 什么是服务端渲染？{.animated.fadeInUp}

<slide :class="size-50 aligncenter">

### 服务端渲染

---

 简单来说就是在服务器上把数据和模板拼接好以后发送给客户端显示。

<slide :class="size-50 ">

回顾下前端的历史，最开始的站点是简单的静态网站。后端把.html文件推送给用户，用户浏览器解析这些字符串进行显示。那个就是 服务端渲染 。可是后来由于网站内容越来越复杂、特效越来越炫酷，这种‘兼职’状态已经不能满足需求，细分之下的前端出现了。

<slide :class="size-50 ">

随后为了方便的开发，开始提倡 前后端分离，大家各做个的，彼此之间通过基于HTTP的各种API协作，变成了数据动态生成的新一代站点。

再后来出现了Vue等三大MVVM框架，网站做成了SPA应用，解决了很多问题的同时也带来了新问题，其中最突出的两个：难以SEO和首屏加载缓慢。
<slide :class="size-40 aligncenter">

## 服务端渲染解决了什么?

<slide :class="size-40 aligncenter">

### 1.SEO难题

<slide :class="size-40 ">
SPA网站们不仅数据是动态生成的，连大部分DOM节点都是动态生成的，后台只提供一个基本模板，而内容需要等到各种JS文件在客户端下载运行完成以后才能显示。
而搜索引擎目前并不会去下载这些JS文件来爬数据（Google已经有了这项技术并在使用，百度暂时没有做），那么在搜索引擎改变策略前，总得想点办法。

<!-- 时尚就是轮回，现在前端竟然也有这个现象...那么大神们想到了办法：那就让我们回到老路上吧。
得益于Node.js的出现，不需要后台做太多，把数据和模板在中间服务器上进行组装，再发送给客户端。 -->

<slide :class="size-40 aligncenter">

### 2.首屏加载缓慢

<slide :class="size-40 ">
随着前端的发展，业务逻辑越来越复杂，代码也越来越厚，各种JS文件越来越大，当一个网页打开，所有东西都下载完页面能打开，白屏时间越来越长。

为了解决这个问题，代码模块化 和 按需加载、占位图 和 预展示 纷纷开始应用，从不同的角度削减了问题程度。但是服务端渲染同样也是解决这个问题的角度之一，由于不少资源在中间服务器上进行拼接，节省了客户端的不少时间，效果也很不错。

<slide :class="size-40 aligncenter">

### 服务端渲染有什么缺点

<slide :class="size-40 ">

1.技术成本，中间增加了这些环节当然要多更多的时间或更多的人来完成，并且还有不少坑要踩。

2.很多计算从客户端移到服务器上，对服务器的压力增加，特别是高并发时会给服务器的 CPU 带来更大的负载。

<slide :class="size-40 aligncenter">

# Vue Server Side render

<slide :class="size-40">

从传统的Nodejs SSR解决方案，是利用pug，ejs,doT，或自定义的模板引擎，去编译服务端的模板，向其中填充数据后，向客户端返回html流
在用户进行页面跳转时，其行为类似于浏览器发送一个http请求访问并匹配某一个api，api返回text/html格式的数据，不论是jsp asp.net而言，都是这种思路。

<slide :class="size-40">

Vue的SSR解决方案也是这样的思路么？vue-server-render也只是一个模板引擎么？
这样似乎并没有发挥Vue的优势，恰恰把spa的优势给抹杀了,
Vue的组件和模板从复杂度上，讲要比其它的模板引擎更加繁重
消耗的CPU算力也更多，而且从效果上讲，和node ssr的传统方案也差不多
为什么我们要用Vue SSR呢？？？
为什么不用Pug？速度更快也成熟
假如你说你想要用Vue的特性的话
Pug，ejs 都可以引入 vue.js , 能使用vue的组件和特性

Vue SSR的优势究竟在哪???

<slide :class="size-40 aligncenter">

# vue-router 的通用代码实现（node and brower）

<slide :class="size-40 ">

Vue 在为了充分发挥SSR和SPA的优势
把他的三件套都改造成了通用代码,可同时运行在node和浏览器中，暴露相同的API

类似的还有[axios](https://github.com/axios/axios),在浏览器使用xhr发送请求,在服务器端使用http发送请求
<https://github.com/axios/axios/tree/master/lib/adapters>

<slide :class="size-80 ">

Vue SSR 的服务端匹配实现类似于:

:::flexblock

```js
// app.js
import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'

export function createApp () {
  // 创建 router 实例
  const router = createRouter()

  const app = new Vue({
    // 注入 router 到根 Vue 实例
    router,
    render: h => h(App)
  })

  // 返回 app 和 router
  return { app, router }
}
```

---

``` js

import { createApp } from './app'

export default context => {
  // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
  // 以便服务器能够等待所有的内容在渲染前，就已经准备就绪。
  return new Promise((resolve, reject) => {
    const { app, router } = createApp()
    // 设置服务器端 router 的位置
    router.push(context.url)
    // 等到 router 将可能的异步组件和钩子函数解析完
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      // 匹配不到的路由，执行 reject 函数，并返回 404
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }
      // Promise 应该 resolve 应用程序实例，以便它可以渲染
      resolve(app)
    }, reject)
  })
}
```

:::

<slide :class="size-60 ">

服务端接收到浏览器的的请求后

```js
const createApp = require('./app')
// server (raw node , connect ,express ,koa etg...)
server.get('*', async (req, res) => {
  const context = {
    url: req.url
  }
  try {
    const app = await createApp(context)
    const html = await renderer.renderToString(app)
    res.end(html)
  } catch (err) {
    if (err.code === 404) {
      res.status(404).end('Page not found')
    } else {
      res.status(500).end('Internal Server Error')
    }
  }
})
```

<slide :class="size-60 ">
上述演示了vue在server端转换为html的过程
但是，这样仅仅是一个模板引擎用法，
Vue SSR的不同点在于客户端激活 (client-side hydration)

<slide :class="size-60 ">
服务端通过vue-router的懒加载和webpack的代码分割，实际上生成的html
类似与浏览器请求特定页面的一个 **快照** 

客户端有完整的代码，在请求到html后，会把common的模块和当前页面代码分割后的js拿下来，
重新在客户端创建Vue对象，从而完成在客户端的数据绑定
而在切换页面时，我们的老朋友
vue-router又出场了

在我们客户端使用$router.push或者\<router-link\>时
浏览器**不会**再去请求服务端的匹配路由接口，而是从本地获取到的js中的vue-router进行匹配
也就是说在第一次请求服务端后，不会再去请求（数据和静态资源除外），而是整个项目被转换成了一个spa项目

<slide :class="size-60 ">
原生a标签因为没有重写click事件，在页面跳转时会重新请求api

<slide :class="size-60 ">
tips:在ssr的请求过后，项目转换成spa，为什么chrome跳转到特定页面，右键查看源代码，还是可以看到所有渲染好的数据
这个行为发生时，我们可以看到network除了第一次请求，有200的document对象，后续时没有的，查看源代码时，chrome发现当前url的document没有出现在最近的缓存中，于是它又发送了一次http请求，从而获取了渲染好的html，假如缓存击中，则不发送http请求，从本地获取源代码

<slide :class="size-60 ">
服务端渲染的优化
三级缓存
1.数据缓存
lru-cache
2.组件缓存
url:VueComponent
3.页面缓存

```js
const oldRenderRoute = renderer.renderRoute;
renderer.renderRoute = async (route, context)=>{
  const cacheKey = getCacheKey(route, context);
  if (!cacheKey) return oldRenderRoute(route, context);
  try {
    const cachedResult = await cache.get(cacheKey);
    if(cachedResult){
      return cachedResult
    }
    const res = oldRenderRoute(route, context)
    cache.set(cacheKey,res) ;
    return res
  } catch (err){
    const res = oldRenderRoute(route, context)
    cache.set(cacheKey,res) ;
    return res
  }
  
}

```

<slide :class="size-60 ">

![build-step](/build-step.png)

<slide :class="size-60 ">

