const express = require('express')
const app = express();

const {
  readFile,
  writeFile,
} = require('./server/utils')

const dataPath = `${__dirname}/server/databases/db.json`

const service = {
  read: readFile(dataPath),
  write: writeFile(dataPath)
}
const routes = require('./server')(service)

app.use(routes)

app.listen(4000)