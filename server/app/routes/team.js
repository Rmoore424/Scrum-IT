'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var TeamModel = mongoose.model('Team');
var TaskModel = mongoose.model('Task');

router.post('/', function (req, res, next) {
	var team = new TeamModel({title: req.body.team});
		team.save(function (err, team) {
	 		if(err) next(err);
	 		res.send(team);		
		});
});

router.put('/', function (req, res, next) {
	TeamModel.findOneAndUpdate({_id: req.body.teamId}, {$push: {members: req.body.userId} })
		.populate('members')
		.exec(function (err, team) {
			console.log(team);
			if (err) next(err);			
			res.send(team);
		});
});

router.put('/remove/task', function (req, res, next) {
	TeamModel.findOneAndUpdate({_id: req.body.teamId}, {$pull: {assignments: req.body.taskId} })
		.populate('assignments')
		.exec(function (err, team) {
			if (err) next(err);
			res.send(team);
		});
});

router.get("/user/:userId", function (req, res, next) {
	TeamModel.find({members: req.params.userId})
	.populate('members')
	.populate('assignments')
		.exec(function (err, team) {
			if (err) next(err);
			res.send(team);
		});
});

router.get("/:teamId", function (req, res, next) {
	TeamModel.findOne({_id: req.params.teamId})
	.populate('members')
		.exec(function (err, team) {
		var tasks = team.assignments;
		TaskModel.find({_id: {$in: tasks}})
		 	.populate('subTasks')
		 	.populate('assigned')
		 		.exec(function (err, tasks) {
		 			console.log(tasks);
		 			if (err) next(err);
		 			res.send({team: team, tasks: tasks});			
		 		});
		});
});