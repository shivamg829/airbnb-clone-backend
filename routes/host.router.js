// External modules
const express = require('express');
const hostRouter = express.Router();

const homesController = require('../controllers/home.controller')
hostRouter.get("/add-home", homesController.getAddHome);
hostRouter.post("/add-home", homesController.postAddHome);

module.exports = {
    hostRouter,
    registeredHomes: homesController.registeredHomes 
};