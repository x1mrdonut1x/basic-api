const express = require('express')
const app = module.exports = express();

// app.get('/', (req, res) => res.end('Working!'))

app.use('/', require('./auth'))
app.use('/user', require('./user'))
app.use('/products', require('./products'))


app.all('*', (req, res) => res.status(404).end())