require('dotenv').config()
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {
  hashPassword
} = require('../utils')

const authService = module.exports = (dependency) => {

  app.post('/register', (req, res) => {

    dependency.read(data => {
      let users = data.users;
      const {
        firstName,
        lastName,
        email,
        password,
      } = req.body;

      // User already found
      if (users.find(u => u.email === email)) return res.sendStatus(400).end()

      const newUser = {
        id: `user-${users.length + 1}`,
        firstName,
        lastName,
        email,
        password: hashPassword(password),
        basket: [],
      }

      users.push(newUser)
      data.users = users;
      dependency.write(data, () => {
        return res.sendStatus(200);
      });

    })
  })

  app.post('/login', (req, res) => {
    const {
      email,
      password
    } = req.body;

    dependency.read(data => {
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