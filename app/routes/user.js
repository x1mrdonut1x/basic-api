require('dotenv').config()
const express = require('express');
const app = module.exports = express();
const fs = require('fs');
const jwt = require('jsonwebtoken')

const userService = module.exports = (dataPath) => {
  app.get('/user')
  app.put('/user')
  app.post('/user')

  app.post('/user/avatar')

  app.get('/user/basket')
  app.put('/user/basket')
  app.post('/user/basket')
  app.delete('/user/basket/')
  app.get('/user/basket/:id')

  app.get('/user', authenticateToken, (req, res) => {
    fs.readFile(__dirname + "/" + "db.json", 'utf8', (err, data) => {
      const users = JSON.parse(data);

      const user = users.find(u => u.id === req.user.id)
      console.log(req.user)
      res.json(user);
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