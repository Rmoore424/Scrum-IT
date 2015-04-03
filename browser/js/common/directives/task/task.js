'use strict';
app.directive('task', function () {
	return {
		restrict: "E",
		controller: "TaskController",
		templateUrl: "js/common/directives/task/task.html"
	}
});

app.controller("TaskController", function ($scope, $cookieStore, socket, PageFactory, SubTaskFactory, TaskFactory, TeamFactory, UserFactory) {

	$scope.showSubTask = function (index) {
		$scope.subTaskIndex = index;
	}

	$scope.addSubTask = function (task, index, newTask) {
		$scope.subTaskIndex = -1;
		$scope.newSubTask = "";
		SubTaskFactory.createSubTask(task._id, newTask).then(function (subtask) {
			PageFactory.team.assignments[index].subTasks.push(subtask);
			socket.emit('newSubTask', {subtask: subtask, index: index, taskId: task._id});
			// TeamFactory.getTeam($scope.teamId).then(function (responseObj) {
			// 	HomeViewFactory.assignments = responseObj.tasks;
			// 	socket.on('newSubTask', responseObj.tasks);
			// });
		});
	}

	$scope.assignToTask = function (email, index, taskId) {
		UserFactory.getUser(email).then(function (user) {
			var userId = user._id;
			if (email == "Unassigned") {
				var newStatus = "Pending";
			}
			else {
				var newStatus = "In Progress";
			}
			PageFactory.team.assignments[index].status = newStatus;
			PageFactory.team.assignments[index].assigned = user;
			TaskFactory.assign(userId, taskId, newStatus).then(function (task) {
				socket.emit('assigned', {task: task, index: index})
			});
		});
	}

	$scope.changeStatus = function (taskId, newStatus) {
		$scope.assignment.status = newStatus;
		socket.emit('taskStatusChange', {taskId: taskId, newStatus: newStatus});
		TaskFactory.updateStatus(taskId, newStatus);
	}
	$scope.changeSubTaskStatus = function (subtask, index, taskId, newStatus) {
		$scope.assignment.subTasks[index].status = newStatus;
		socket.emit('subTaskStatusChange', {subTaskId: subtask._id, taskId: taskId, newStatus: newStatus});
		SubTaskFactory.updateStatus(subtask._id, newStatus);
	}
	$scope.removeTask = function (taskId, index) {
		PageFactory.team.assignments.splice(index, 1);
		socket.emit("removeTask", {taskId: taskId});
		TaskFactory.deleteTask(taskId);
	}

	$scope.removeSubTask = function (subtaskId, taskId, index) {
		$scope.assignment.subTasks.splice(index, 1);
		socket.emit('removeSubTask', {subTaskId: subtaskId, taskId: taskId})
		SubTaskFactory.deleteSubTask(subtaskId).then(function (subtask) {
			TaskFactory.removeSubTask(taskId, subtaskId);
		});
	}
});