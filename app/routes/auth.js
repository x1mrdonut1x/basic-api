require('dotenv').config()
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const authService = module.exports = (service) => {

  app.post('/register', (req, res) => {

    service.read(data => {
      let users = data.users;
      const {
        email,
        password
      } = req.body;

      if (users.findIndex(u => u.email === email) > -1) return res.sendStatus(400).end()

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const newUser = {
        id: `user-${users.length + 1}`,
        email,
        password: hash,
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

      const user = users.find(u => u.email === email)
      if (user == null) return res.sendStatus(400)

      const result = bcrypt.compareSync(password, user.password)


      if (!result) return res.sendStatus(401)

      const accessToken = jwt.sign({
        id: user.id
      }, process.env.TOKEN_SECRET)
      res.json({
        accessToken
      })
    })
  })

  return app
}