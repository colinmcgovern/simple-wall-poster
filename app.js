//Used For Random String Generation
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

//Requiring Modules 
var app = require('express')();
var express = require('express'); 
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var multer = require('multer');

//Import Routes
const post = require('./routes/post.route'); 
const user = require('./routes/user.route');

//Set up mongoose connnection 
const mongoose = require('mongoose');
var dev_db_url = 'mongodb://colinmcg:PASSWORDGOESHERE1@ds113853.mlab.com:13853/productstutorial';
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise; 
var db = mongoose.connection;
db.on('error',console.error.bind(console,'MongoDB connection error:')); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/posts',post); 
app.use('/users',user); 

//Port Setup
var port = process.env.PORT || 80;

app.listen(port, () => {
	console.log('Server is up and running on port number ' + port);
});  

app.use("/", express.static(__dirname + '/'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/');
});
