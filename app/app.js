const express = require('express')
const app = express();
const routes = require('./routes')
  // var mongoose = require('mongoose');

// // Mongodb connection url 
// var MONGODB_URI = "mongodb://localhost:27017/db";
// // Connect to MongoDB 
// mongoose.connect(MONGODB_URI);
// mongoose.connection.on('connected', () => {
//   console.log('Connected to MongoDB @ 27017');
// });

app.use(express.json())
app.use(routes)

app.listen(3000)