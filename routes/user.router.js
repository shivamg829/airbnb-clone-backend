// Core modules
const path = require('path');
// External modules
const express = require('express');
const userRouter = express.Router();
// local modules
const rootDir = require('../utils/pathUtils');

// Import the SAME registeredHomes array from host.router
const { registeredHomes } = require('./host.router');

userRouter.get("/", (req, res, next) => {
    console.log('Displaying homes:', registeredHomes);
    res.render('home', { 
        registeredHomes: registeredHomes, 
        pageTitle: 'airbnb Home' ,
        currPage: 'Home' 
    });
});

module.exports = userRouter;