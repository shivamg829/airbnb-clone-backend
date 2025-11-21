const express = require('express');
const hostRouter = express.Router();
const hostController = require('../controllers/host.controller');

hostRouter.get('/add-home', hostController.getAddHome);
hostRouter.post('/add-home', hostController.postAddHome);
hostRouter.get('/hosthomelist', hostController.getHostHome);
hostRouter.get('/editHomeform/:homeId', hostController.getEditHome);
hostRouter.post('/editHomeform', hostController.postEditHome);
hostRouter.post('/deleteHome/:homeId', hostController.postDeleteHome);

module.exports = { hostRouter };
