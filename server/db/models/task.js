'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	title: {
		type: String
	},
	description: {
		type: String
	},
	subTasks: 
		[{type: mongoose.Schema.Types.ObjectId, ref: "SubTask"}],
	assigned: {
		type: String
	},
	status: {
		type: String, default: "Pending"
	}
});

mongoose.model("Task", schema);