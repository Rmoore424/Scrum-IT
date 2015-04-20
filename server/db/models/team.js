'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	title: {
		type: String
	},
	members:
		[{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
	//rename tasks
	assignments:
		[{type: mongoose.Schema.Types.ObjectId, ref: "Task", default: []}],
	manager: {
		type: mongoose.Schema.Types.ObjectId, ref: "User"
	}
});

mongoose.model("Team", schema);