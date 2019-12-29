const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const express = require('express');
const expressHandlebars = require('express-handlebars');
const flash = require('connect-flash');
const logger = require('morgan');
const path = require('path');
const passport = require('passport');
const session = require('express-session');

//app.use(express.static('public'));

//require('./config/passport');

// Connect to DB
const db_name = 'school';
mongoose.connect(`mongodb://localhost/${db_name}`)
  .then(() => console.log(`Connected to MongoDB database ${db_name}`))
  .catch(err => console.error("Could not connect to MongoDB...", err));

// 1. Setup express app
const app = express();
app.use(morgan('dev'));

// 2. View page handlers
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', expressHandlebars({defaultLayout: 'layout' }));
app.set('view engine', 'handlebars');

app.use(passport.initialize())
app.use(passport.session())

// 3. Session setup 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  cookie: { maxAge: 60000},
  secret: 'codeworkrsecret',
  saveUninitialized: false,
  resave: false,
}));


// 4. Flash 
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success')
  res.locals.error_messages = req.flash('error')
  next()
});

// 5. Page handlers 
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));


// 6. catch 404 and forward to error handler
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
  res.render('notFound');
});

module.exports = app;
