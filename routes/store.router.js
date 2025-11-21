const express = require('express');
const storeRouter = express.Router();
const storeController = require('../controllers/store.controller');

storeRouter.get("/", storeController.getIndex);
storeRouter.get("/homes", storeController.getHome);
storeRouter.get("/bookings", storeController.getBookings);
storeRouter.get("/favouritelist", storeController.getFavouriteList);
storeRouter.get("/home/:homeId", storeController.getHomeDetails);
storeRouter.post('/favouritelist', storeController.postAddFavourite);
storeRouter.post('/favouritelist/delete/:homeId', storeController.postRemoveFavourite);
module.exports = storeRouter;