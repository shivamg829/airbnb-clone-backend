const registeredHomes = [];
exports.getHome = (req, res, next) => {
    console.log('Displaying homes:', registeredHomes);
    res.render('home', { 
        registeredHomes: registeredHomes, 
        pageTitle: 'airbnb Home' ,
        currPage: 'Home' 
    });
}

exports.getAddHome = function (req, res, next) {
    res.render('addHome', {
        pageTitle: 'Add Home',
        currPage: 'Add Home'
    });
}
exports.postAddHome = (req, res, next) => {
    const { houseName, price, location, rating, photoUrl } = req.body;
    registeredHomes.push({
        houseName: houseName,
        price: price,
        location: location,
        rating: rating,
        photoUrl: photoUrl

    });
    res.redirect('/');
}
exports.registeredHomes = registeredHomes;