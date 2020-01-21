require('dotenv').config()
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken')
const {
  hashPassword
} = require('../utils')

const userService = (dependency) => {

  // app.post('/user/avatar')

  // app.get('/user/basket')
  // app.put('/user/basket')
  // app.post('/user/basket')
  // app.delete('/user/basket/')
  // app.get('/user/basket/:id')

  app.get('/:id', authenticateToken, (req, res) => {
    dependency.read(data => {
      // Find user index in table
      const user = data.users.find(u => u.id === req.params.id)
      if (user == null) return res.sendStatus(400)

      return res.status(200).json({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      }).end();
    });
  })

  app.put('/:id', authenticateToken, (req, res) => {
    dependency.read(data => {
      // Find user index in table
      const userIndex = data.users.findIndex(u => u.id === req.params.id)
      if (userIndex < 0) return res.sendStatus(400)

      let newUser = {
        ...data.users[userIndex],
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      }
      // Check if password is being changed
      if (req.body.hasOwnProperty('password')) {
        newUser.password = hashPassword(req.body.password)
      }
      data.users[userIndex] = newUser;

      dependency.write(data, () => {
        return res.status(200).json(newUser);
      });

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

module.exports = userService;