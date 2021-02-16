const express = require('express');
const cart = express.Router();

// logic for our endpoints
const cartItems = [
    {id: 1, product: "Lemons", price: 0.50, quantity: 6},
    {id: 2, product: "Avocados", price: 0.79, quantity: 4},
    {id: 3, product: "Shrimp", price: 12.50, quantity: 1},
    {id: 4, product: "Pineapple Juice", price: 4.75, quantity: 1},
    {id: 5, product: "Prosecco", price: 11.99, quantity: 1},
];

cart.get("/cart-items", (req, res) => {
    // this is the logic to return a list of items
    // you may have code in here that accept query strings

    let returnedItems = cartItems; // setting it to the full list

    // adding a query to get a subset of your data
    if (req.query) {

        // let maxPrice = parseFloat(req.query.maxPrice);
        // console.log(maxPrice);
        // if (maxPrice) {
        //     returnedItems = cartItems.filter((item) => {
        //          return item.price <= maxPrice
        //     });
        // }
    
        // let prefix = req.query.prefix;
        // let returnedItems = cartItems.filter((returnedItems) => {
        //     return returnedItems.product.startsWith(prefix) === true;
        // });
        // console.log("PREFIX ITEMS", returnedItems);
        // if (returnedItems) {
        //     res.json(returnedItems);
        // } 

        if (req.query.maxPrice) {
            returnedItems = cartItems.filter(
              (i) => i.price < parseFloat(req.query.maxPrice)
            );
        }
        
        if (req.query.prefix) {
            returnedItems = cartItems.filter((i) =>
              i.product.startsWith(req.query.prefix)
            );
        }

        if (req.query.pageSize) {
                returnedItems = cartItems.slice(0, parseInt(req.query.pageSize));
        }
    
        res.status(200).json(returnedItems);   
    } 
});

cart.get("/cart-items/:id", (req, res) => {
    // this is the logic to a single item by id
    // whatever you have after the : is set to the params variable
    // for example:
    const id = parseInt(req.params.id);

    // use this id as a way of finding your
    // item
    const item = cartItems.find((item) => {
        return item.id === id;
    })
    if (item) {
        console.log(item);
        res.json(item);
    } else {
        res.status(404);
        res.send("ID Not Found");
    };   
});

// accept POST request at URI: /routes
cart.post("/cart-items", (req, res) => {
    // Get item from body
    const newItem = req.body;
    // Add to array
    cartItems.push(newItem);

    res.status(201); // return 201 status code
    res.json(newItem) // return changed list
});

// accept PUT request at URI: /cart-items
cart.put("/cart-items/:id", (req, res) => {

    // const id = parseInt(req.params.id);

    // use this id as a way of finding your
    // item
    const index = cartItems.findIndex((item) => {
        return item.id === parseInt(req.params.id);
    })

    // Get item from body
    const updatedItem = req.body;

    // Add to array
    //removes 1 item from the array, starting at the index provided,
    // then adds newItem in its place
    cartItems.splice(index, 1, updatedItem);
    // console.log(item.id);
    console.log(index);
    console.log(updatedItem);

  res.status(200);
  res.json(updatedItem);
});

// accept DELETE request at URI: /cart-items
cart.delete("/cart-items/:id", (req, res) => {
    // use this id as a way of finding your
    // item
    const index = cartItems.findIndex((item) => {
        return item.id === parseInt(req.params.id);
    })

    cartItems.splice(index, 1);
    res.status(204);
    res.json("");
});

// export module so it's usable in other files
module.exports = cart;