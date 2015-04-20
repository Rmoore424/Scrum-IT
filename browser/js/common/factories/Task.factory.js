'use strict';
app.factory("Task", function ($http) {
	return {
		create: function (teamId, newTask) {
			return $http.post("/api/task", {teamId: teamId,  task: {title: newTask}}).then(function (response) {
				return response.data;
			});
		}, 
		getOne: function (taskId) {
			return $http.get("/api/task" +taskId).then(function (response) {
				return response.data;
			});
		},
		getAll: function() {
			return $http.get('/api/task').then(function (response) {
				return response.data;
			});
		},
		assign: function (email, taskId, status) {
			return $http.put('/api/task', {email: email, taskId: taskId, status: status}).then(function (response) {
				return response.data;
			});
		},
		updateStatus: function (taskId, newStatus) {
			return $http.put('/api/task/status', {taskId: taskId, newStatus: newStatus}).then(function (response) {
				return response.data;
			});
		},
		deleteOne: function (taskId) {
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