require('dotenv').config()
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken')

const productService = (dependency) => {
  app.get('/products')
  app.put('/products')
  app.post('/products')
  app.delete('/products')
  app.get('/products/:id')

  app.get('/', (req, res) => {
    dependency.read(data => {
      return res.status(200).json(data.products).end();
    });
  })

  return app
}

module.exports = productService;