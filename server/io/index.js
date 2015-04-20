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
			socket.broadcast.emit('updateTeam', data);
		});
		socket.on('newTask', function (data) {
			socket.to(currRoom).emit('addTask', data);
		});
		socket.on('removeTask', function (data) {
			socket.to(currRoom).emit('deleteTask', data);
		});
		socket.on('assigned', function (data) {
			socket.to(currRoom).emit('assignToTask', data);
		});
		socket.on('newSub', function (data) {
			socket.to(currRoom).emit('addSub', data);
		});
		socket.on('removeSub', function (data) {
			socket.to(currRoom).emit('deleteSub', data);
		});
		socket.on('taskStatusChange', function (data) {
			socket.to(currRoom).emit('updateStatus', data);
		});
		socket.on('subTaskStatusChange', function (data) {
			socket.to(currRoom).emit('updateSubStatus', data);
		});
    });

};