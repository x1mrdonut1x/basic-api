const express = require('express')
const app = express();

const serverService = (dependencies) => {
  app.use(express.json())

  app.use('/auth', require('./routes/auth')(dependencies))
  app.use('/user', require('./routes/user')(dependencies))
  app.use('/user/basket', require('./routes/basket')(dependencies))
  app.use('/products', require('./routes/products')(dependencies))

  app.all('*', (req, res) => res.sendStatus(404))

  return app;
}


module.exports = serverService