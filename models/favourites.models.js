const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtils.js');
const favouritePath = path.join(rootDir, 'data', 'favourite.json');

module.exports = class Favourite {
  static addToFavourite(homeId, callback) {
    Favourite.getFavourites((favourites) => {
      if (favourites.includes(homeId)) {
        callback("Home is already marked favourite");
      } else {
        favourites.push(homeId);
        fs.writeFile(favouritePath, JSON.stringify(favourites), (err) => {
          callback(err);
        });
      }
    });
  }

  static getFavourites(callback) {
    fs.readFile(favouritePath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }

  static deleteById(delhomeID, callback) {
    this.getFavourites((homeIds) => {
      homeIds = homeIds.filter(homeId => homeId !== delhomeID);
      fs.writeFile(favouritePath, JSON.stringify(homeIds), (err) => {
        callback(err);
      });
    });
  }
};