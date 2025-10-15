exports.use404 = (req, res) => {
        res.render('404', {  
        pageTitle: '404' ,
        currPage: '404' 
    });
}