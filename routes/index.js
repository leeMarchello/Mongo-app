var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')

/* GET home page. */

const clientSchema = new mongoose.Schema({
  name: String,
  surname: String,
  schoolName:  String,
  courseList: Array, 
  grade: String,
  age: Number,
  email: String,
  password: String,
  gender: String,
  centre: String,
});

// Create a model for schema

router.get('/', function(req, res, next) {
  res.sendFile(__dirname + '/login.html');
});

router.get('/register', function(req, res, next) {
  res.sendFile(__dirname + '/register.html');
});

router.get('/', function(req, res, next) {
  res.sendFile(__dirname + '/style.css');
});

router.post('/api/register', function(req, res){
  console.log('Registration body received: ', req.body);
  console.log('req.body.name: ', req.body.name);
   
  const Client = mongoose.model('clients', clientSchema);
  const newClient = new Client(req.body);
  newClient.save((err, client) => {
    if (err) res.send(err);
    res.send(`Client saved to mongoDB: ${client}`);
  });
})


module.exports = router;
