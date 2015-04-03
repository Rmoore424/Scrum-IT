'use strict';
app.factory("TeamFactory", function ($http) {
	return {
		createTeam: function (newTeam, userId) {
			return $http.post("/api/team", { team: newTeam, userId: userId }).then(function (response) {
				return response.data;
			});
		},
		getUserTeams: function (userId) {
			return $http.get("/api/team/user/" +userId).then(function (response) {
				return response.data;
			});
		},
		addToTeam: function (teamId, userId) {
			return $http.put("/api/team", {teamId: teamId, userId: userId}).then(function (response) {
				return response.data;
			});
		},
		getTeam: function (teamId) {
			return $http.get("/api/team/" +teamId).then(function (response) {
				return response.data;
			});
		},
		removeTask: function (taskId, teamId) {
			return $http.put("/api/team/remove/task", {taskId: taskId, teamId: teamId}).then(function (response) {
				return response.data;
			});
		}
	}
});