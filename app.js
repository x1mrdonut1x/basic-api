const express = require('express')
const app = express();

const {
  readFile,
  writeFile,
} = require('./app/utils')

const dataPath = `${__dirname}/app/databases/db.json`

const service = {
  read: readFile(dataPath),
  write: writeFile(dataPath)
}
const routes = require('./app/server.js')(service)

app.use(routes)

app.listen(4000)