'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var TaskModel = mongoose.model('Task');
var TeamModel = mongoose.model('Team');
var SubTaskModel = mongoose.model('SubTask');
var UserModel = mongoose.model('User');

router.post("/", function (req, res, next) {
	TaskModel.create(req.body.task, function (err, task) {
		if (err) next(err);
		TeamModel.findOneAndUpdate({_id: req.body.teamId}, { $push: {assignments: task._id} }, function (err, team) {
			if (err) next(err);
			res.send(task);
		});
	});
});

router.post("/subtask", function (req, res, next) {
	SubTaskModel.create(req.body.task, function (err, subtask) {
		TaskModel.findOneAndUpdate({_id: req.body.taskId}, {$push: {subTasks: subtask._id}})
			.exec(function (err, masterTask) {
				if (err) next(err);
				res.send(subtask);
			});
	});
});

router.get("/", function (req, res, next) {
	TaskModel.find({})
		.exec(function (err, tasks) {
			if (err) next(err);
			res.send(tasks);
		});
});

router.put('/', function (req, res, next) {
	TaskModel.findOneAndUpdate({_id: req.body.taskId}, {$set: {assigned: req.body.userId, status: req.body.status}})
		.populate('subTasks')
		.populate('assigned')
		.exec(function (err, task) {
			if (err) next(err);
			res.send(task);
		});
});

router.put('/status', function (req, res, next) {
	TaskModel.findOneAndUpdate({_id: req.body.taskId}, {$set: {status: req.body.newStatus}})
		.populate('subTasks')
		.exec(function (err, task) {
			if (err) next(err);
			res.send(task);
		});
});

router.put('/subtask/remove', function (req, res, next) {
	TaskModel.findOneAndUpdate({_id: req.body.taskId}, {$pull: {assignments: req.body.subtaskId} })
		.exec(function (err, task) {
			if (err) next(err);
			res.send(task);
		});
});

router.put('/subtask/status', function (req, res, next) {
	SubTaskModel.findOneAndUpdate({_id: req.body.subtaskId}, {$set: {status: req.body.newStatus}})
		.exec(function (err, task) {
			if (err) next(err);
			res.send(task);
		});
});

router.delete('/:taskId', function (req, res, next) {
	TaskModel.findOneAndRemove({_id: req.params.taskId}, function (err, task) {
		if (err) next(err);
		res.send(task);
	});
});

router.delete('/subtask/:subtaskId', function (req, res, next) {
	SubTaskModel.findOneAndRemove({_id: req.params.subtaskId}, function (err, subtask) {
		if (err) next(err);
		res.send(subtask);
	});
});