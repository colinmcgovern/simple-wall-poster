const Post = require('../models/post.model');


//Create 
exports.post_create = function (req, res) {

	var post = new Post({
		name: req.body.name,
		price: req.body.price,
		created_by: req.body.created_by
	});

	post.save(function (err) {
		if (err) {
			return next (err);
		}
		res.send('Post created successfully');
	});
};

//Read 
exports.post_details = function (req, res) {

	if(req.params.id == "all"){
		Post.find( function (err,post) {
		if (err) return next(err);
		res.send(post);
		})
	}
	else
	{
		Post.findById(req.params.id, function (err,post) {
		if (err) return next(err);
		res.send(post);
		})
	}
};

//TODO update and delete

//Update 
exports.product_update = function (req, res) {
	/*
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) return next(err);
        res.send('Product updated.');
    });
    */
};

//Delete
exports.product_delete = function (req, res) {
	/*
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
    */
};