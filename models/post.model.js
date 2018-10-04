const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

var PostSchema = new Schema({
	text: {type: String, required: true},
	created_by: {type: String, required: true},
	created_time: {type: Number, required: true},
});

//Export the model 
module.exports = mongoose.model('Post',PostSchema);