'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	title: {
		type: String
	},
	description: {
		type: String
	},
	assigned: {
		type: mongoose.Schema.Types.ObjectId, ref: "User"
	},
	status: {
		type: String, default: "Pending"
	}
});

mongoose.model('SubTask', schema);