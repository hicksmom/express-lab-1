const express = require('express');
const cart = express.Router();

// logic for our endpoints
const cartItems = [
    {id: 1, product: "lemons", price: 0.50, quantity: 6},
    {id: 2, product: "avocados", price: 0.79, quantity: 4},
    {id: 3, product: "shrimp", price: 12.50, quantity: 1},
    {id: 4, product: "pineapple juice", price: 4.75, quantity: 1},
    {id: 5, product: "prosecco", price: 11.99, quantity: 1},
];

cart.get("/", (req, res) => {
    // this is the logic to return a list of items
    // you may have code in here that accept query strings
    let returnedItems = cartItems; // setting it to the full list

    // adding a query to get a subset of your
    // data
    let maxPrice = parseFloat(req.query.maxPrice)
    console.log(maxPrice);
    if (maxPrice) {
        returnedItems = cartItems.filter((item) => {
             return item.price <= maxPrice
        })
    }

    let prefix = req.query.prefix;

    let prefixItems = cartItems.filter((prefixItems) => {
        return prefixItems.product.startsWith(prefix) === true;
    })
    if (prefixItems) {
        res.json(cartItems);
    } else {
        res.status(404);
        res.send("Prefix Not Found");
    }; 
});

     res.json(returnedItems);
});

// cart.get("/", (req, res) => {
//     const prefix = req.query.prefix;

//     const prefixItems = cartItems.filter((prefixItems) => {
//         return prefixItems.product.startsWith(prefix) === true;
//     })
//     if (prefixItems) {
//         res.json(cartItems);
//     } else {
//         res.status(404);
//         res.send("Prefix Not Found");
//     }; 
// });

cart.get("/:id", (req, res) => {
    // this is the logic to a single item by id
    // whatever you have after the : is set to the params variable
    // for example:
    const id = req.params.id;

    // use this id as a way of finding your
    // item
    const item = cartItems.find((item) => {
        return item.id === id;
    })
    if (item) {
        res.json(item);
    } else {
        res.status(404);
        res.send("ID Not Found");
    };   
});

// accept POST request at URI: /routes
cart.post("/", (req, res) => {
    // Get item from body
    const newItem = req.body;
    // Add to array
    cartItems.push(newItem);

    res.status(201); // return 201 status code
    res.json(cartItems) // return changed list
});

// accept PUT request at URI: /cart-items
cart.put("/:id", (req, res) => {

    const id = req.params.id;

    // use this id as a way of finding your
    // item
    const index = cartItems.findIndex((item) => {
        return cartItems.id === id;
    })

    // Get item from body
    const newItem = req.body;

    // Add to array
    //removes 1 item from the array, starting at the index provided,
    // then adds newItem in its place
    cartItems.splice(index, 1, newItem);

  res.json(newItem);
});

// accept DELETE request at URI: /cart-items
cart.delete("/:id", (req, res) => {
    // use this id as a way of finding your
    // item
    const index = cartItems.findIndex((item) => {
        return item.id === parseInt(req.params.id);
    })

    cartItems.splice(index, 1);
    res.status(204);
    res.json("No Content");
});

// export module so it's usable in other files
module.exports = cart;