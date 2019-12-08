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
  comment: String,
});

// Create a model for schema
const queryDB = mongoose.model('clients', clientSchema);
router.get('/', function(req, res) {
  res.sendFile('index.html');
});

router.get('/register', function(req, res, next) {
  //res.sendFile(__dirname + '/register.html');
  res.sendFile('register.html');
});

router.post('/api/login', function(req, res) {
  queryDB.find({email: req.body.email, password: req.body.password})
  .limit(1)
  .then(data => {
    console.log("DB data.email: ", data[0].email);
    console.log("DB data.password: ", data[0].password);
    if (data){
        if (req.body.email === data[0].email && req.body.password === data[0].password ) {
          console.log("Email and password matches in database");
          res.send(JSON.stringify(data[0]))
        }
    }
    else {
      console.log("Credentials not found");
      res.status(404).send("Not Found"); 
    }
    })
    .catch(err => res.status(404).send(err));
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
