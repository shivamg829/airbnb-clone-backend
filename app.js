// app.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const storeRouter = require('./routes/store.router');
const { hostRouter } = require('./routes/host.router');
const authRouter = require('./routes/auth.router');

const rootDir = require('./utils/pathUtils');
const controller404 = require('./controllers/404.controller');

const { mongoClientConnect, mongooseConnect } = require('./utils/database');

const app = express();

// view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// cookie parser
app.use(cookieParser(process.env.COOKIE_SECRET || 'secret'));

// static assets - placed BEFORE routes so css/js serve properly
app.use(express.static(path.join(rootDir, 'public')));

// simple logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

// cookie-checker middleware (you were directly parsing req.get('Cookie'))
app.use((req, res, next) => {
  // prefer cookie-parser: req.signedCookies or req.cookies
  const isLoggedIn = (req.cookies && req.cookies.isLoggedIn === 'true') || false;
  req.isLoggedIn = isLoggedIn;
  next();
});

// Routes
app.use(storeRouter);

// protect /host
app.use('/host', (req, res, next) => {
  if (req.isLoggedIn) return next();
  res.redirect('/login');
});
app.use('/host', hostRouter);

app.use(authRouter);

// 404
app.use(controller404.use404);

const PORT = process.env.PORT || 3000;

// connect both DB drivers, then start server
Promise.all([mongoClientConnect(), mongooseConnect()])
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect DBs:', err);
    process.exit(1);
  });
