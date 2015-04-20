'use strict';
app.directive('task', function () {
	return {
		restrict: "E",
		controller: "TaskController",
		templateUrl: "js/common/directives/task/task.html"
	}
});

app.controller("TaskController", function ($scope, $cookieStore, socket, Page, SubTask, Task, Team, User) {
	
	socket.on('addSub', function (data) {
		Page.team.assignments[data.taskIndex].subTasks.push(data.subTask);
	});

	socket.on("deleteSub", function (data) {
		Page.team.assignments[data.taskIndex].subTasks.splice(data.subIndex, 1);
	});

	socket.on('assignToTask', function (data) {
		Page.team.assignments[data.taskIndex].assigned = data.assigned;
		Page.team.assignments[data.taskIndex].status = data.status;

	});

	socket.on('updateStatus', function (data) {
		Page.team.assignments[data.taskIndex].status = data.status;
	});

	socket.on('updateSubStatus', function (data) {
		Page.team.assignments[data.taskIndex].subTasks[data.subIndex].status = data.newStatus;
	})

	$scope.removeTask = function (taskId, index) {
		Page.team.assignments.splice(index, 1);
		socket.emit("removeTask", index);
		Task.deleteOne(taskId);
	}

	$scope.showSubTask = function (index) {
		$scope.subTaskIndex = index;
	}

	$scope.addSubTask = function (taskId, newTask, taskIndex) {
		$scope.subTaskIndex = -1;
		$scope.newSubTask = "";
		SubTask.create(taskId, newTask).then(function (subTask) {
			Page.team.assignments[taskIndex].subTasks.push(subTask);
			socket.emit('newSub', {subTask: subTask, taskIndex: taskIndex});
		});
	}

	$scope.removeSubTask = function (subtaskId, taskId, subIndex, taskIndex) {
		$scope.assignment.subTasks.splice(subIndex, 1);
		socket.emit('removeSub', {subIndex: subIndex, taskIndex: taskIndex});
		SubTask.deleteOne(subtaskId).then(function (subtask) {
			Task.removeSubTask(taskId, subtaskId);
		});
	}

	$scope.assignToTask = function (assigned, taskIndex, taskId) {
		if (assigned == "Unassigned") {
			var newStatus = "Pending";
			assigned = '';
		}
		else {
			var newStatus = "In Progress";
		}
		$scope.assignment.status = newStatus;
		$scope.assignment.assigned = assigned;
		Task.assign(assigned, taskId, newStatus).then(function (task) {
			socket.emit('assigned', {assigned: task.assigned, status: task.status, taskIndex: taskIndex})
		});
	}

	$scope.changeStatus = function (taskId, taskIndex, newStatus) {
		$scope.assignment.status = newStatus;
		socket.emit('taskStatusChange', {taskIndex: taskIndex, newStatus: newStatus});
		Task.updateStatus(taskId, newStatus);
	}
	
	$scope.changeSubTaskStatus = function (subTaskId, subIndex, taskIndex, newStatus) {
		$scope.assignment.subTasks[subIndex].status = newStatus;
		socket.emit('subTaskStatusChange', {subIndex: subIndex, taskIndex: taskIndex, newStatus: newStatus});
		SubTask.updateStatus(subTaskId, newStatus);
	}

});