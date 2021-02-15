const express = require('express');
const routes = express.Router();

// logic for our endpoints
const routesList = [];

routes.get("/", (req, res) => {
    // this is the logic to return a list of items
    // you may have code in here that accept query strings
    let returnedRoutes = routesList; // setting it to the full list

    // adding a query to get a subset of your
    // data
    if ( req.query.name ) {
        returnRoutes = routesList.filter( (route) => {
             return route.name === req.query.name
        })
    }

     res.json(returnedRoutes);
});

routes.get("/:routeId", (req, res) => {
    // this is the logic to a single item by id
    // whatever you have after the : is set to the params variable
    // for example:
    const id = req.params.routeId;

    // use this id as a way of finding your
    // item
    const item = routesList.find( (route) => {
        return route.id === id;
    })

    res.json(item);
});

// accept POST request at URI: /routes
routes.post("/", (req, res) => {
    // Get item from body
    const newRoute = req.body;
    // Add to array
    routes.push(newRoute);

    res.status(201); // return 201 status code
    res.json(routesList) // return changed list
});

// accept PUT request at URI: /routes
routes.put("/:routeId", (req, res) => {
    const id = req.params.routeId;

    // use this id as a way of finding your
    // item
    const index = routesList.findIndex( (route) => {
        return route.id === id;
    })

    // Get item from body
    const newRoute = req.body;

    // Add to array
    //removes 1 item from the array, starting at the index provided,
    // then adds newStudent in its place
    routes.splice(index, 1, newRoute);

  res.json(newRoute);
});

// accept DELETE request at URI: /routes
routes.delete("/:id", (req, res) => {
    // use this id as a way of finding your
    // item
    const index = routesList.findIndex( (route) => {
        return route.id === req.params.id;
    })

    routes.splice(index, 1);
    res.status(204)
    res.json("Deleted");
});

// export module so it's usable in other files
module.exports = routes;