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
const queryDB = mongoose.model('clients', clientSchema);
router.get('/', function(req, res, next) {
  res.sendFile(__dirname + '/login.html');
});

router.get('/register', function(req, res, next) {
  res.sendFile(__dirname + '/register.html');
});

router.post('/api/login', function(req, res) {
  console.log("login request received: ", req.body);
  queryDB.find({email: req.body.email, password: req.body.password})
  .then(data => {
    console.log("query data: ", JSON.stringify(data));
    console.log("data.email: ", data[0].email);
    if (req.body.email === data[0].email && req.body.password === data[0].password )
      res.send(JSON.stringify(data[0]))
    else
      return null; 
    });
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
