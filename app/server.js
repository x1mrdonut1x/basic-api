const express = require('express')
const app = module.exports = express();
const {
  writeFile,
  readFile
} = require('./utils')

app.use(express.json())

const dataPath = `${__dirname}/databases/db.json`

const service = {
  dataPath,
  readFile,
  writeFile
}

app.use('/auth', require('./routes/auth')(service))
app.use('/user', require('./routes/user')(service))
app.use('/products', require('./routes/products')(service))

app.all('*', (req, res) => res.status(404).end())

// module.exports = Server