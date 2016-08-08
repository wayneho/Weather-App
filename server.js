const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./webpack.config')
const express = require('express')

const app = new (require('express'))()
const port = process.env.PORT || 8080

console.log(process.env.NODE_ENV)

if(process.env.NODE_ENV !== 'production'){ 
  const compiler = webpack(config)
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
  app.use(webpackHotMiddleware(compiler))

}

app.use(express.static(__dirname + '/dist'))
app.get("*", function(req, res) {
  res.sendFile(__dirname + '/dist/index.html')
})

app.use((req,res) => {
  // control for favicon
  if(req.url === '/favicon.ico'){
    res.writeHead(200, {'Content-Type': 'image/x-icon'} )
    res.end()
    //console.log('favicon requested')
    return
  }
})

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s.", port)
  }
})
