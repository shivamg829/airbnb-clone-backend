// External modules
const express = require('express');
const userRouter = express.Router();
// local modules
const homesController = require('../controllers/home.controller')
userRouter.get("/",homesController.getHome );
module.exports = userRouter;