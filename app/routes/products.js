require('dotenv').config()
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken')

const productService = (dependency) => {
  
  app.get('/', (req, res) => {
    dependency.read(data => {
      return res.status(200).json(data.products);
    });
  })

  app.get('/:id', (req, res) => {
    dependency.read(data => {
      //Find product in table
      const product = data.products.find(prod => prod.id === req.params.id)
      if (product == null) return res.sendStatus(400).end()

      return res.status(200).json(product);
    });
  })

  app.post('/', (req, res) => {
    dependency.read(data => {
      let products = data.products;

      const newProduct = {
        id: `prod-${products.length + 1}`,
        name: req.body.name,
        price: req.body.price
      }
      products.push(newProduct);
      data.products = products;

      dependency.write(data, () => {
        return res.json(newProduct);
      });
    });
  })

  app.put('/:id', (req, res) => {
    dependency.read(data => {
      let products = data.products;
      //Find product in table
      const productIndex = products.findIndex(prod => prod.id === req.params.id)
      if (productIndex < 0) return res.sendStatus(400).end()

      const newProduct = products[productIndex]

      // Assign only changed properties
      if (req.body.hasOwnProperty('name'))
        newProduct.name = req.body.name
      if (req.body.hasOwnProperty('price'))
        newProduct.price = req.body.price

      data.products[productIndex] = newProduct;

      dependency.write(data, () => {
        return res.json(newProduct);
      });
    });
  })

  app.delete('/:id', (req, res) => {
    dependency.read(data => {
      // Find user index in table
      const productIndex = data.products.findIndex(u => u.id === req.params.id)
      if (productIndex < 0) return res.sendStatus(400).end()

      data.products.splice(productIndex, 1)

      dependency.write(data, () => {
        return res.status(200).end();
      });

    });
  })

  return app
}

module.exports = productService;