require('dotenv').config()
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {
  hashPassword
} = require('../utils')

const authService = module.exports = (service) => {

  app.post('/register', (req, res) => {

    service.read(data => {
      let users = data.users;
      const {
        email,
        password
      } = req.body;

      // User already found
      if (users.findIndex(u => u.email === email) > -1) return res.sendStatus(400).end()

      const newUser = {
        id: `user-${users.length + 1}`,
        email,
        password: hashPassword(password),
        basket: [],
      }

      users.push(newUser)
      data.users = users;
      service.write(data, () => {
        res.sendStatus(200);
      });

    })
  })

  app.post('/login', (req, res) => {
    const {
      email,
      password
    } = req.body;

    service.read(data => {
      let users = data.users;

      // Check if user exists
      const user = users.find(u => u.email === email)
      if (user == null) return res.sendStatus(400)

      // Check password
      const result = bcrypt.compareSync(password, user.password)
      if (!result) return res.sendStatus(401)

      // Generate JWT token
      const accessToken = jwt.sign({
        id: user.id
      }, process.env.TOKEN_SECRET)

      return res.status(200).json({
        accessToken
      }).end()
    })
  })

  return app
}