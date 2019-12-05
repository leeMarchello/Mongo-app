var cookieParser = require('cookie-parser');
var createError = require('http-errors');
var mongoose = require('mongoose');
var express = require('express');
var logger = require('morgan');
var path = require('path');
const bodyParser = require('body-parser')
// Connect to DB
mongoose.connect('mongodb://localhost/school')
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB...", err));




// Create DB schema 
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [ String ],
  date: {
    type: Date,
    default: Date.now 
  },
  isPublished: Boolean
});

// Compile schema into a model (similar to creating a Class)
const Course = mongoose.model('Course', courseSchema);

//Course.find({}).select({__v: 0, _id: 0})
 // .then(courses => console.log("All courses: ", courses));

async function createCourse(courseList) {
  // Create instance of model (like instantiating a class)
  for (const courseItem of courseList){
    const course = new Course(courseItem);
    const result = await course.save();
    console.log("Saved document to DB: ", result);    
  }
} 

async function getCourses(){
  const courses = await Course
    .find({author: 'Mosh', isPublished: true}) // Set filter, 
    .limit(10)
    .sort({name: 1})                           // 1 = ascending order, -1 = descending
    .select({tags: 0, isPublished: 0})         // Select the properties you want included(1)/excluded(0)
    .catch(err => {
      console.log("getCourses promise rejected: ", err.message)
      process.exit();
    });
  console.log("Course collection: ", courses);
}


// View page handlers
var indexRouter = require('./routes/index');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

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
