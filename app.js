var cookieParser = require('cookie-parser');
var createError = require('http-errors');
var mongoose = require('mongoose');
var express = require('express');
var logger = require('morgan');
var path = require('path');
// jin wei made this
// Connect to DB
const db_name = 'school';
mongoose.connect(`mongodb://localhost/${db_name}`)
  .then(() => console.log(`Connected to MongoDB database ${db_name}`))
  .catch(err => console.error("Could not connect to MongoDB...", err));

// View page handlers
var indexRouter = require('./routes/index');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// serve static files
app.use(express.static(__dirname + '/public'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

// API endpoint handlers 
app.use('/', indexRouter);

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
