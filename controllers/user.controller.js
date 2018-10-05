var crypto = require('crypto');
var now = require('nano-time');

function gen_token(){
	return crypto.randomBytes(64).toString('hex');
}

function hash_pass(password,salt){
	var output = password + salt; 

	for(var i = 0; i < 256; i++){
		output = crypto.createHash('sha256').update(output).digest('base64');
	}

	return output; 
}

//Setting token expiration time 
function set_login_timeout(hours){
	return hours * 3.6 * 1000000000;
}

const login_timeout = set_login_timeout(24);


//Checking if password passes security 
function check_username(username){
	if(username.length < 3){
		return "~Username too short";
	}
	else if(username.length > 16){
		return "~Username too long";
	}
	else{
		return "Pass";
	}
}

//Checking if password passes security 
function check_password_security(password){
	if(password.length < 8){
		return "~Password too short";
	}
	else if(!/\d/.test(password)){
		return "~Password does not contain number";
	}
	else if(!/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(password)){
		return "~Password does not contain symbol";
	}
	else if(!/[a-z]/.test(password) || !/[A-Z]/.test(password)){
		return "~Password must contain one upper and lower case letter"
	}
	else{
		return "Pass";
	}
}

const User = require('../models/user.model');

//Create 
exports.user_create = function (req, res) {

	//User Creation 
	if(req.body.user_creation == "1"){

		User.findOne({ username: req.body.username.toUpperCase() }, {username: 1 }, function (err, result) {
	        if (err) return next(err);
	        
	        //Checking if username already exits
	        if(result == null){

	        	if(check_password_security(req.body.password)!="Pass"){
	        		res.send(check_password_security(req.body.password));
	        	}
	        	else if(check_username(req.body.username.toUpperCase())!="Pass"){
	        		res.send(check_username(req.body.username.toUpperCase()));
	        	}
	        	else{

					var new_token = gen_token();
					var salt = gen_token();

					var user = new User({
						username: req.body.username.toUpperCase(),
						password: hash_pass(req.body.password,salt),
						token: new_token,
						salt: salt,
						last_login: now.micro()
					});

					user.save(function (err) {
						if (err) {
							return next (err);
						}	
						res.send(new_token);
					});

	        	}

	        }else{
	        	res.send('~Username already exists');
	        }

	    });
		
	}else{

		//User Logging In
		User.findOne({ username: req.body.username.toUpperCase() }, {password: 1, salt: 1, token: 1}, function (err, result) {

			if(result != null){

				if (err) return next(err);

				if(hash_pass(req.body.password,result.salt) == result.password){
					res.send(result.token);
				}else{
					res.send('~Password is not correct');
				}

			}else{
				res.send('~Username not found');
			}

		});
	}

};

//Read 
exports.user_details = function (req, res) {
	User.findOne({ token: req.params.token }, {username: 1, last_login: 1}, function (err, result) {
		if (err) return next(err);

		if(result == null){
			res.send(''); //Token not found 
		}
		else if((now.micro() - result.last_login) > login_timeout){
			res.send(''); //Token has expired
		}else{
			res.send(result.username.toUpperCase());
		}
    });
};

//TODO Update and Delete 

//Update 
exports.user_update = function (req, res) {
    /*
    User.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, user) {
        if (err) return next(err);
        res.send('User updated.');
    });
    */
};

//Delete
exports.user_delete = function (req, res) {
	/*
    User.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
    */
};