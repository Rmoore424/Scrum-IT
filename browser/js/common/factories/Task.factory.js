'use strict';
app.factory("TaskFactory", function ($http) {
	return {
		createTask: function (teamId, newTask) {
			return $http.post("/api/task", {teamId: teamId,  task: {title: newTask}}).then(function (response) {
				return response.data;
			});
		}, 
		getTask: function (taskId) {
			return $http.get("/api/task" +taskId).then(function (response) {
				return response.data;
			});
		},
		getTasks: function() {
			return $http.get('/api/task').then(function (response) {
				return response.data;
			});
		},
		assign: function (userId, taskId, status) {
			return $http.put('/api/task', {userId: userId, taskId: taskId, status: status}).then(function (response) {
				return response.data;
			});
		},
		updateStatus: function (taskId, newStatus) {
			return $http.put('/api/task/status', {taskId: taskId, newStatus: newStatus}).then(function (response) {
				return response.data;
			});
		},
		deleteTask: function (taskId) {
			return $http.delete('/api/task/' +taskId).then(function (response) {
				return response.data;
			});
		},
		removeSubTask: function (taskId, subtaskId) {
			return $http.put('/api/task/subtask/remove', {taskId: taskId, subtaskId: subtaskId}).then(function (response) {
				return response.data;
			});
		}
	}
});