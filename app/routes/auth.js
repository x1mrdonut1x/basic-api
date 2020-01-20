require('dotenv').config()
const express = require('express');
const app = module.exports = express();
const fs = require('fs');
const jwt = require('jsonwebtoken')

app.post('/auth/register', (req, res) => {
  fs.readFile(__dirname + "/" + "db.json", 'utf8', (err, data) => {
    let users = JSON.parse(data);
    const newUser = {
      email: req.body.username,
      id: users.length
    }
    users.push(newUser)

    fs.writeFile(__dirname + "/" + "db.json", JSON.stringify(users, null, 2), function(err) {
      if (err) {
        return console.log(err);
      }
      res.json(newUser);
    });
  })
})

app.post('/auth/login', (req, res) => {

  const id = req.body.id;
  const user = {
    id
  }
  const accessToken = jwt.sign(user, process.env.TOKEN_SECRET)
  res.json({
    accessToken
  })
})