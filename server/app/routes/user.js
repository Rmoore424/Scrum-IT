'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');

router.get('/:email', function (req, res, next) {
	UserModel.findOne({ email: req.params.email }, function (err, user) {
		if (err) next(err);
		res.send(user);
	});
});

router.get('/', function (req, res, next) {
	UserModel.find()
		.exec(function (err, users) {
			if (err) next(err);
			res.send(users);
		});
});

router.post('/', function (req, res, next) {
	UserModel.create(req.body, function (err, user) {
		if (err) {
			if (err.code === 11000 || err.code === 11001) {
				res.send({error:"User already exists"});
			}
			else next(err);
		}
		else {
			res.send({user: user});
		}	
	});
});