'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('home.page', {
		url: '/:id',
		controller: "PageCtrl",
		templateUrl: 'js/common/directives/page/page.html'
	})
})

app.controller('PageCtrl', function ($scope, socket, $stateParams, Team, Page) {

	$scope.join = function () {
		console.log($stateParams.id);
		socket.emit('join', $stateParams.id);
	}

	$scope.join();

	socket.on('updateSubTasks', function (data) {
		for (var i = 0; i < Page.team.assignments.length; i++) {
			if (Page.team.assignments[i]._id == data.taskId) {
				Page.team.assignments[data.index].subTasks.push(data.subtask);
			}
		}
	});

	socket.on('updateAssignment', function (data) {
		for (var i = 0; i < Page.team.assignments.length; i++) {
			if (Page.team.assignments[i]._id == data.task._id) {
				Page.team.assignments[data.index] = data.task;
			}
		}
	});

	socket.on("taskDeleted", function (data) {
		for (var i = 0; i < Page.team.assignments.length; i++) {
			if (Page.team.assignments[i]._id == data.taskId) {
				Page.team.assignments.splice(i, 1);
			}
		}
	});

	socket.on("subTaskDeleted", function (data) {
		for (var i = 0; i < Page.team.assignments.length; i++) {
			if (Page.team.assignments[i]._id == data.taskId) {
				for (var j = 0; j < Page.team.assignments[i].subTasks.length; j++) {
					if (Page.team.assignments[i].subTasks[j]._id == data.subTaskId) {
						Page.team.assignments[i].subTasks.splice(j, 1);
					}
				}
			}
		}
	});

	socket.on('updateStatus', function (data) {
		for (var i = 0; i < Page.team.assignments.length; i++) {
			if (Page.team.assignments[i]._id == data.taskId) {
				Page.team.assignments[i].status = data.newStatus;
			}
		}
	});

	socket.on('updateSubStatus', function (data) {
		for (var i = 0; i < Page.team.assignments.length; i++) {
			if (Page.team.assignments[i]._id == data.taskId) {
				for (var j = 0; j < Page.team.assignments[i].subTasks.length; j++) {
					if (Page.team.assignments[i].subTasks[j]._id == data.subTaskId) {
						Page.team.assignments[i].subTasks[j].status = data.newStatus;
					}
				}
			}
		}
	});

	$scope.page = Page;
	Team.getOne($stateParams.id).then(function (responseObj) {
		Page.team = responseObj.team;
		Page.team.assignments = responseObj.tasks;
	});
});