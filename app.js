const express = require('express')
const app = express();
const routes = require('./app/server.js')

app.use(routes)

app.listen(4000)