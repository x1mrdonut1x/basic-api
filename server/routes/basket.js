require('dotenv').config()
const express = require('express');
const app = express();
const {
  hashPassword,
  authenticateToken
} = require('../utils')

const userBasketService = (dependency) => {

  app.get('/', authenticateToken, (req, res) => {
    dependency.read(data => {
      const user = data.users.find(u => u.id === req.user.id)
      if (user == null) return res.sendStatus(400).end()

      let basketProducts = []
      user.basket.forEach(productId => {
        let temp = data.products.find(p => {
            return p.id === productId
          })
        if (temp != null) basketProducts.push(temp)
      })
      
      return res.status(200).json(basketProducts);
    });
  })

  app.get('/:id', authenticateToken, (req, res) => {
    dependency.read(data => {
      // Find user in table
      const user = data.users.find(u => u.id === req.user.id)
      if (user == null) return res.sendStatus(400).end()

      // Find product in table
      const product = data.products.find(prod => prod.id === req.params.id)
      if (product == null) return res.sendStatus(400).end()

      return res.status(200).json(product);
    });
  })


  app.post('/', authenticateToken, (req, res) => {
    dependency.read(data => {
      // Find user index in table
      const userIndex = data.users.findIndex(u => u.id === req.user.id)
      if (userIndex < 0) return res.sendStatus(400).end()

      // Find product in table
      const product = data.products.find(prod => prod.id === req.body.id)
      if (product == null) return res.sendStatus(400).end()

      data.users[userIndex].basket.push(product.id);

      dependency.write(data, () => {
        return res.status(200).json(data.users[userIndex].basket);
      });
    });
  })

  app.delete('/:id', authenticateToken, (req, res) => {
    dependency.read(data => {
      // Find user index in table
      const userIndex = data.users.findIndex(u => u.id === req.user.id)
      if (userIndex < 0) return res.sendStatus(400).end()

      const productIndex = data.users[userIndex].basket.findIndex(p => p === req.params.id)
      if (productIndex < 0) return res.sendStatus(400).end()

      data.users[userIndex].basket.splice(productIndex, 1)

      dependency.write(data, () => {
        return res.status(200).json(data.users[userIndex].basket);
      });

    });
  })

  return app
}

module.exports = userBasketService;