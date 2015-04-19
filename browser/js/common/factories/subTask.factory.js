'use strict';
app.factory('SubTask', function ($http) {
	return {
		create: function (taskId, newTask) {
			return $http.post("/api/task/subtask", {taskId: taskId, task: {title: newTask}}).then(function (response) {
				return response.data;
			});
		},
		deleteOne: function (subtaskId) {
			return $http.delete('/api/task/subtask/' +subtaskId).then(function (response) {
				return response.data;
			});
		},
		updateStatus: function (subtaskId, newStatus) {
			return $http.put('/api/task/subtask/status', {subtaskId: subtaskId, newStatus: newStatus}).then(function (response) {
				return response.data;
			});
		}
	}
});

