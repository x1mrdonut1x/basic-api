require('dotenv').config()
const express = require('express');
const app = module.exports = express();
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

app.post('/register', (req, res) => {

  fs.readFile(__dirname + "/../" + "db.json", 'utf8', (err, data) => {
    data = JSON.parse(data);
    let users = data.users;
    const {
      email,
      password
    } = req.body;
    console.log(email, password)

    if (users.findIndex(u => u.email === email) > -1) return res.json(400).end()

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    console.log(salt, hash)
    const newUser = {
      id: `user-${users.length + 1}`,
      email,
      password: hash,
      //   salt,
      basket: [],
    }

    users.push(newUser)
    data.users = users
    fs.writeFile(__dirname + "/../" + "db.json", JSON.stringify(data, null, 2), function(err) {
      if (err) {
        return console.log(err);
      }
      res.json(newUser);
    });


  })
})

app.post('/login', (req, res) => {
  const {
    email,
    password
  } = req.body;

  fs.readFile(__dirname + "/../" + "db.json", 'utf8', (err, data) => {
    let users = JSON.parse(data).users;

    const user = users.find(u => u.email === email)
    if (user == null) return res.sendStatus(400).end()
    
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