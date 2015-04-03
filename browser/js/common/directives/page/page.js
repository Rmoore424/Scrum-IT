'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('home.page', {
		url: '/:id',
		controller: "PageCtrl",
		templateUrl: 'js/common/directives/page/page.html'
	})
})

app.controller('PageCtrl', function ($scope, socket, $stateParams, TeamFactory, PageFactory) {
	socket.on('updateSubTasks', function (data) {
		for (var i = 0; i < PageFactory.team.assignments.length; i++) {
			if (PageFactory.team.assignments[i]._id == data.taskId) {
				PageFactory.team.assignments[data.index].subTasks.push(data.subtask);
			}
		}
	});

	socket.on('updateAssignment', function (data) {
		for (var i = 0; i < PageFactory.team.assignments.length; i++) {
			if (PageFactory.team.assignments[i]._id == data.task._id) {
				PageFactory.team.assignments[data.index] = data.task;
			}
		}
	});

	socket.on("taskDeleted", function (data) {
		for (var i = 0; i < PageFactory.team.assignments.length; i++) {
			if (PageFactory.team.assignments[i]._id == data.taskId) {
				PageFactory.team.assignments.splice(i, 1);
			}
		}
	});

	socket.on("subTaskDeleted", function (data) {
		for (var i = 0; i < PageFactory.team.assignments.length; i++) {
			if (PageFactory.team.assignments[i]._id == data.taskId) {
				for (var j = 0; j < PageFactory.team.assignments[i].subTasks.length; j++) {
					if (PageFactory.team.assignments[i].subTasks[j]._id == data.subTaskId) {
						PageFactory.team.assignments[i].subTasks.splice(j, 1);
					}
				}
			}
		}
	});

	socket.on('updateStatus', function (data) {
		for (var i = 0; i < PageFactory.team.assignments.length; i++) {
			if (PageFactory.team.assignments[i]._id == data.taskId) {
				PageFactory.team.assignments[i].status = data.newStatus;
			}
		}
	});

	socket.on('updateSubStatus', function (data) {
		for (var i = 0; i < PageFactory.team.assignments.length; i++) {
			if (PageFactory.team.assignments[i]._id == data.taskId) {
				for (var j = 0; j < PageFactory.team.assignments[i].subTasks.length; j++) {
					if (PageFactory.team.assignments[i].subTasks[j]._id == data.subTaskId) {
						PageFactory.team.assignments[i].subTasks[j].status = data.newStatus;
					}
				}
			}
		}
	});

	$scope.page = PageFactory;
	TeamFactory.getTeam($stateParams.id).then(function (responseObj) {
		PageFactory.team = responseObj.team;
		PageFactory.team.assignments = responseObj.tasks;
	});
});
// app.directive("page", function () {
// 	return {
// 		restrict: "E",
// 		templateUrl: "js/common/directives/page/page.html"
// 	}
// })