// Core modules
const path = require('path');
// External modules
const express = require('express');
const hostRouter = express.Router();
// local modules
const rootDir = require('../utils/pathUtils');

// Make sure this is the SAME array instance that userRouter imports
const registeredHomes = [];

hostRouter.get("/add-home", (req, res, next) => {
        res.render('addHome', { 
        pageTitle: 'Add Home',
        currPage: 'Add Home' 
    });
});

hostRouter.post("/add-home", (req, res, next) => {
    const { houseName, price, location, rating, photoUrl } = req.body;
    
    // Add the new home to the array
    registeredHomes.push({
        houseName: houseName,
        price: price,
        location: location,
        rating: rating,
        photoUrl: photoUrl

    });
    
    console.log('New home added:', { houseName, price, location, rating, photoUrl });
    console.log('All homes:', registeredHomes);
    
    res.redirect('/');
});

// Export both the router and the array
module.exports = {
    hostRouter,
    registeredHomes
};