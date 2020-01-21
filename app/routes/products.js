require('dotenv').config()
const express = require('express');
const app = module.exports = express();
const fs = require('fs');
const jwt = require('jsonwebtoken')

const productService = module.exports = (dataPath) => {
  app.get('/products')
  app.put('/products')
  app.post('/products')
  app.delete('/products')
  app.get('/products/:id')
  return app
}