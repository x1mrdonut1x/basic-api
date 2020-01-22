require('dotenv').config()
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const readFile = (filePath) => (callback) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    callback(JSON.parse(data));
  });
}

const writeFile = (filePath) => (fileData, callback) => {
  fs.writeFile(filePath,
    JSON.stringify(fileData, null, 2), 'utf8', (err) => {
      if (err) {
        throw err;
      }

      callback();
    });
}

const readObject = (data) => (callback) => {
  callback(data)
}

const writeObject = (data, callback) => {
  callback()
}

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  return hash
}

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token === null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

module.exports = {
  readFile,
  writeFile,
  readObject,
  writeObject,
  hashPassword,
  authenticateToken
};