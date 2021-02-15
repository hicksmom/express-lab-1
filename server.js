const express = require('express');
const port = 3000;
const app = express();

// Import routes file, this is where
// the API logic will go
const cart = require('./cart.js');

// the routes module will serve
// the API from /my-routes
app.use('/cart-items', cart);

// Allows you to use path params, body, and
// query string parameters
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});