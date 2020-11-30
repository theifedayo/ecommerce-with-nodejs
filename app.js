var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressHbs = require('express-handlebars')
const dotenv = require('dotenv')
const session = require('express-session')
const connectDB = require('./models/db')
const cors = require('cors')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const flash = require('connect-flash')



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

dotenv.config({path: './config/config.env'})

var app = express();


connectDB()
// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}))
app.set('view engine', '.hbs')

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

//Handle express sessions
app.use(session({
	secret: process.env.SESSION_SECRET,
	saveUninitialized: true,
	resave: true
}))

app.use(flash());

//handle passport
app.use(passport.initialize())
app.use(passport.session())

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
