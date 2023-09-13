// todo: look into schema.org and use open graph tags by default
// todo: use developers.google.com/books API to enrich book data after it's created
// info: Notes and Things mockup - https://balsamiq.cloud/sz7zl5n/pt7qwj0/r6491

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');
require('dotenv').config();
require('./config/database');
require('./config/passport')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const booksRouter = require('./routes/books');
// const listsRouter = require('./routes/lists');
// const notesRouter = require('./routes/notes');
// const votesRouter = require('./routes/votes');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

const sessionAge = 3600000
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + sessionAge,
    maxAge: sessionAge
  },
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/books', booksRouter);
// app.use('/lists', listsRouter);
// app.use('/notes', notesRouter);
// app.use('/votes', votesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
