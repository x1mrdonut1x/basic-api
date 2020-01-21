require('dotenv').config()
const express = require('express');
const app = express();
const {
  hashPassword,
  authenticateToken
} = require('../utils')

const userService = (dependency) => {

  app.get('/', authenticateToken, (req, res) => {
    dependency.read(data => {
      // Find user in table
      const user = data.users.find(u => u.id === req.user.id)
      if (user == null) return res.sendStatus(400)

      return res.status(200).json({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    });
  })

  app.put('/', authenticateToken, (req, res) => {
    dependency.read(data => {
      // Find user index in table
      const userIndex = data.users.findIndex(u => u.id === req.user.id)
      if (userIndex < 0) return res.sendStatus(400).end()

      let newUser = data.users[userIndex]

      // Assign only changed properties
      if (req.body.hasOwnProperty('firstName'))
        newUser.firstName = req.body.firstName
      if (req.body.hasOwnProperty('lastName'))
        newUser.lastName = req.body.lastName
      if (req.body.hasOwnProperty('password'))
        newUser.password = hashPassword(req.body.password)

      data.users[userIndex] = newUser;

      dependency.write(data, () => {
        return res.status(200).json(newUser);
      });

    });
  })

  app.delete('/', authenticateToken, (req, res) => {
    dependency.read(data => {
      // Find user index in table
      const userIndex = data.users.findIndex(u => u.id === req.user.id)
      if (userIndex < 0) return res.sendStatus(400).end()

      data.users.splice(userIndex, 1)

      dependency.write(data, () => {
        return res.status(200).end();
      });

    });
  })

  return app
}

module.exports = userService;