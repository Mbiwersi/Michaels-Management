var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/authentication');
var rentRouter = require('./routes/rentRoute');
var docRouter = require('./routes/document')


var app = express();

let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/final', {
  useNewUrlParser: true
});

////////////////////////// SESSION MANAGEMENT ///////////////////////
var MongoDBStore = require('connect-mongodb-session')(session);

let mongoSessionStore = new MongoDBStore({
  uri: 'mongodb://localhost:27017/final',
  collection: 'sessions'
});

app.use(session({
  secret: 'kdajfkjsaghjv4hgf4gfj3y8',
  resave: true,
  saveUninitialized: false,
  cookie: {
    httpOnly : true,
    secure: false,
    sameSite: false,
    maxAge: 1000 * 60 *20 // 20 mins
  },
  name: 'sid',
  rolling: true,
  store: mongoSessionStore
}));
/////////////////////////////////////////////////////////////////////////////

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', docRouter);
app.use('/', rentRouter);
app.use('/', indexRouter);
app.use('/', authRouter);

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
  res.send('error');
});

module.exports = app;
