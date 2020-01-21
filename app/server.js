const express = require('express')
const app = express();

const serverService = (service) => {
  app.use(express.json())

  app.use('/auth', require('./routes/auth')(service))
  app.use('/user', require('./routes/user')(service))
  app.use('/products', require('./routes/products')(service))

  app.all('*', (req, res) => res.sendStatus(404))

  return app;
}


module.exports = serverService