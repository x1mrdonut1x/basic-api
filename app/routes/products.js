require('dotenv').config()
const express = require('express');
const app = module.exports = express();
const fs = require('fs');
const jwt = require('jsonwebtoken')

app.get('/products')
app.put('/products')
app.post('/products')
app.delete('/products')
app.get('/products/:id')