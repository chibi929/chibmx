const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.get('/test', (req, res, next) => {
  const param = { test: 'Hello World!' }
  res.send(param)
})
module.exports = app
