const Home = require('../models/home.model');

exports.getHostHome = (req, res, next) => {
  Home.fetchAll((homes) => {
    res.render("host/hosthomelist", {
      registeredHomes: homes,
      pageTitle: "Host Homes List",
      currPage: "hosthomes",
      isLoggedIn: req.isLoggedIn 
    });
  });
};

exports.getAddHome = (req, res, next) => {
  res.render('host/editHomeform', {
    pageTitle: 'Add Home',
    currPage: 'addHome',
    editing: false,
    isLoggedIn: req.isLoggedIn 
  });
};

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl);
  home.save();
  res.redirect('/host/hosthomelist'); 
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === 'true';
  Home.findById(homeId, home => {
    if (!home) {
      console.log("Home not found for editing.");
      return res.status(404).render('404', {
        pageTitle: 'Home Not Found',
        currPage: '404',
        isLoggedIn: req.isLoggedIn 
      });
    }
    res.render('host/editHomeform', {
      home: home,
      pageTitle: 'Edit your Home',
      currPage: 'hosthomes',
      editing: editing,
      isLoggedIn: req.isLoggedIn 
    });
  });
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, location, rating, photoUrl } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl);
  home.id = id;
  home.save().then(()=>{
    console.log("Home saved successfully");
  });
  res.redirect('/host/hosthomelist'); 
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.deleteById(homeId, error => {
    if (error) {
      console.log(error);
      return res.status(500).render('404', {
        pageTitle: 'Error Deleting Home',
        currPage: '404',
        isLoggedIn: req.isLoggedIn 
      });
    }
    res.redirect('/host/hosthomelist'); 
  });
};