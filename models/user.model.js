const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

var UserSchema = new Schema({
	username: {type: String, required: true, unique : true, dropDups: true},
	password: {type: String, required: true},
	token: {type: String, required: true},
	salt: {type: String, required: true},
	last_login: {type: String, required: true}
});

//Export the model 
module.exports = mongoose.model('User',UserSchema);