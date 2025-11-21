const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtils.js');
const Favourite = require('./favourites.models.js');
const filePath = path.join(rootDir, 'data', 'home.json');

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }

  save() {

  }

  static fetchAll(callback) {
    fs.readFile(filePath, (err, data) => {
      let homes = [];
      if (!err && data) {
        try {
          homes = JSON.parse(data);
        } catch (parseErr) {
          console.log(parseErr);
        }
      }
      callback(homes);
    });
  }

  static findById(id, callback) {
    this.fetchAll((homes) => {
      const home = homes.find(h => h.id === id);
      callback(home);
    });
  }

  static deleteById(homeID, callback) {
    this.fetchAll((homes) => {
      homes = homes.filter(home => home.id !== homeID);
      fs.writeFile(filePath, JSON.stringify(homes), (err) => {
        if (err) {
          callback(err);
          return;
        }
        Favourite.deleteById(homeID, callback);
      });
    });
  }
};