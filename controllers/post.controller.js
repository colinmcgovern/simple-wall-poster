var now = require('nano-time');

const User = require('../models/user.model');  //user table needs to be checked
const Post = require('../models/post.model');

//Create 
exports.post_create = function (req, res) {

	User.findOne({ token: req.body.token }, {username: 1 }, function (err, result) {
		if (err) return next(err);

		if(result != null){
			var post = new Post({
				text: req.body.text + " ",
				created_by: result.username.toUpperCase(),
				creation_time: now.micro()
			});

			post.save(function (err) {
				if (err) {
					return next (err);
				}	
				res.send('success');
			});
		
		}else{
			res.send('');
		}

	});

};

//Read 
exports.post_details = function (req, res) {

	if(req.params.id == "all"){
		Post.find( function (err, result) {
			if (err) return next(err);
			res.send(result);
		});
	}
	else
	{
		Post.findById(req.params.id, function (err, result) {
			if (err) return next(err);
			if(result != null){
				res.send(result);
			}else{
				res.send('not found');
			}
			
		});
	}
};

//TODO update and delete

//Update 
exports.post_update = function (req, res) {
	/*
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) return next(err);
        res.send('Product updated.');
    });
    */
};

//Delete
exports.post_delete = function (req, res) {
	/*
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
    */
};