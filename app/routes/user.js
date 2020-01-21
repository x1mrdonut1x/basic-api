require('dotenv').config()
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken')

const userService = module.exports = (service) => {
  // app.get('/user')
  // app.put('/user')
  // app.post('/user')

  // app.post('/user/avatar')

  // app.get('/user/basket')
  // app.put('/user/basket')
  // app.post('/user/basket')
  // app.delete('/user/basket/')
  // app.get('/user/basket/:id')

  app.get('/:id', authenticateToken, (req, res) => {
    service.read(data => {
      const user = data.users.find(u => u.id === req.params.id)

      if (user == null) return res.sendStatus(400)

      return res.status(200).json({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      }).end();
    });
  })

  function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token === null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }
  return app
}