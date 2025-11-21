const Favourite = require("../models/favourites.models");
const Home = require("../models/home.model");

exports.getHome = (req, res, next) => {
  Home.fetchAll((homes) => {
    res.render("store/index", {
      registeredHomes: homes,
      pageTitle: "Airbnb Home",
      currPage: "Home",
      isLoggedIn: req.isLoggedIn 
    });
  });
};

exports.getIndex = (req, res, next) => {
  Home.fetchAll((homes) => {
    res.render("store/homelist", {
      registeredHomes: homes,
      pageTitle: "Airbnb Home",
      currPage: "Home",
      isLoggedIn: req.isLoggedIn 
    });
  });
};

exports.getBookings = (req, res, next) => {
  res.render("store/booking", {
    pageTitle: "My Bookings",
    currPage: "bookings",
    isLoggedIn: req.isLoggedIn 
  });
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.getFavourites((favourites) => {
    Home.fetchAll((homes) => {
      const favouriteHomes = homes.filter(home => favourites.includes(home.id));
      res.render("store/favouritelist", {
        favouriteHomes: favouriteHomes,
        pageTitle: "My Favourites",
        currPage: "favouritelist",
        isLoggedIn: req.isLoggedIn 
      });
    });
  });
};

exports.postAddFavourite = (req, res, next) => {
  const homeId = req.body.homeId;
  Favourite.addToFavourite(homeId, error => {
    if (error) {
      console.log(error);
      return res.redirect("/favouritelist");
    }
    res.redirect("/favouritelist");
  });
};

exports.postRemoveFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.deleteById(homeId, error => {
    if (error) {
      console.log(error);
      return res.status(500).render('404', {
        pageTitle: 'Error Removing Favourite',
        currPage: '404',
        isLoggedIn: req.isLoggedIn 
      });
    }
    res.redirect("/favouritelist");
  });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId, (home) => {
    if (!home) {
      return res.status(404).render('404', {
        pageTitle: 'Home Not Found',
        currPage: '404',
        isLoggedIn: req.isLoggedIn 
      });
    }
    res.render("store/homedetail", {
      home: home,
      pageTitle: home.houseName + " - Details",
      currPage: "Home",
      isLoggedIn: req.isLoggedIn 
    });
  });
};