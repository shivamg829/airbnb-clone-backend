// External Modules
const express = require('express');
const path = require('path');
// local modules
const userRouter = require("./routes/user.router")
const {hostRouter} = require("./routes/host.router")
const rootDir = require('./utils/pathUtils')

const app = express();
app.set('view engine', 'ejs');
app.set('views','views');

// Middleware to give method and url(path)
app.use((req, res, next) => {
    console.log(req.url, req.method);
    next();
});
// body parser for every form and input data
app.use(express.urlencoded());
// Routes....
app.use(userRouter);
app.use("/host",hostRouter);
// css 
app.use(express.static(path.join(rootDir,'public')))
// 404 handler
app.use((req, res) => {
        res.render('404', {  
        pageTitle: '404' ,
        currPage: '404' 
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});