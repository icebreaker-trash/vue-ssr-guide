const express = require('express');
const http = require('http');
const fs = require('fs-extra')
const app = express();
const render = require('./rawRender')
const path = require('path')
const ejs = require('ejs')
const dot = require('dot')
const pug = require('pug')
const engineList = ['raw', 'ejs', 'pug', 'dot']
app.use('/:engine',

  async (req, res) => {
    const {
      engine
    } = req.params
    if (engineList.includes(engine)) {
      let html = await fs.readFile(path.resolve(__dirname, './index.templete.html'), {
        encoding: 'utf-8'
      })
      let renderedHtml
      switch (engine) {
        case 'raw': {
          renderedHtml = render('<span class="title">${master}</span>', {
            master: 'icebreaker',
          })

          break
        }
        case 'ejs': {
          renderedHtml = ejs.render("<div><h1 class='header'><%- header %></h1><h2 class='header2'><%- header2 %></h2><h3 class='header3'><%- header3 %></h3><h4 class='header4'><%- header4 %></h4><h5 class='header5'><%- header5 %></h5><h6 class='header6'><%- header6 %></h6><ul class='list'><% for (var i = 0, l = list.length; i < l; i++) { %><li class='item'><%- list[i] %></li><% } %></ul></div>", {
            header: "Header",
            header2: "Header2",
            header3: "Header3",
            header4: "Header4",
            header5: "Header5",
            header6: "Header6",
            list: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
          })
          break
        }
        case 'pug': {
          const fn = pug.compile("p #{name}'s Pug source code!")
          renderedHtml = fn({
            name: 'icebreaker'
          })
          break
        }
        case 'dot': {
          const renderFunc = dot.template("<div><h1 class='header'>{{= it.header }}</h1><h2 class='header2'>{{= it.header2 }}</h2><h3 class='header3'>{{= it.header3 }}</h3><h4 class='header4'>{{= it.header4 }}</h4><h5 class='header5'>{{= it.header5 }}</h5><h6 class='header6'>{{= it.header6 }}</h6><ul class='list'>{{ for (var i = 0, l = it.list.length; i < l; i++) { }}<li class='item'>{{= it.list[i] }}</li>{{ } }}</ul></div>")
          renderedHtml = renderFunc({
            header: "Header",
            header2: "Header2",
            header3: "Header3",
            header4: "Header4",
            header5: "Header5",
            header6: "Header6",
            list: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
          })
        }
      }
      html = html.replace(`<!--${engine}-->`, renderedHtml)
      res.setHeader('Content-Type', 'text/html')
      res.end(html)
    } else {
      res.status(401).send('param engine is not valid')
    }

  });


http.createServer(app).listen(3000);