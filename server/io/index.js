'use strict';
var socketio = require('socket.io');
var io = null;

module.exports = function (server) {

    if (io) return io;

    io = socketio(server);

    io.on('connection', function (socket) {
		socket.on('users', function (data) {
			socket.emit('userAdded', data);
		});
		socket.on('newMember', function (data) {
			socket.broadcast.emit('updateTeam', data);
		});
		socket.on('newTask', function (data) {
			socket.broadcast.emit('updateTasks', data);
		});
		socket.on('newSubTask', function (data) {
			socket.broadcast.emit('updateSubTasks', data);
		});
		socket.on('assigned', function (data) {
			socket.broadcast.emit('updateAssignment', data);
		});
		socket.on('removeTask', function (data) {
			socket.broadcast.emit('taskDeleted', data);
		});
		socket.on('taskStatusChange', function (data) {
			socket.broadcast.emit('updateStatus', data);
		});
		socket.on('subTaskStatusChange', function (data) {
			socket.broadcast.emit('updateSubStatus', data);
		});
		socket.on('removeSubTask', function (data) {
			socket.broadcast.emit('subTaskDeleted', data);
		});
    });

};