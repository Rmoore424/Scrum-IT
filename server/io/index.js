'use strict';
var socketio = require('socket.io');
var io = null;

module.exports = function (server) {

    if (io) return io;

    io = socketio(server);

    io.on('connection', function (socket) {
    	var currRoom;
    	socket.on('join', function (room) {
    		if (currRoom) socket.leave(currRoom);
    		currRoom = room;
    		socket.join(room);
    	});

		socket.on('users', function (data) {
			socket.emit('userAdded', data);
		});
		socket.on('newMember', function (data) {
			socket.emit('updateTeam', data);
		});
		socket.on('newTask', function (data) {
			socket.to(currRoom).emit('updateTasks', data);
		});
		socket.on('newSubTask', function (data) {
			socket.to(currRoom).emit('updateSubTasks', data);
		});
		socket.on('assigned', function (data) {
			socket.to(currRoom).emit('updateAssignment', data);
		});
		socket.on('removeTask', function (data) {
			socket.to(currRoom).emit('taskDeleted', data);
		});
		socket.on('taskStatusChange', function (data) {
			socket.to(currRoom).emit('updateStatus', data);
		});
		socket.on('subTaskStatusChange', function (data) {
			socket.to(currRoom).emit('updateSubStatus', data);
		});
		socket.on('removeSubTask', function (data) {
			socket.to(currRoom).emit('subTaskDeleted', data);
		});
    });

};