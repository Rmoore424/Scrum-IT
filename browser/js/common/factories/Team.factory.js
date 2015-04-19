'use strict';
app.factory("Team", function ($http) {
	return {
		create: function (newTeam, userId) {
			return $http.post("/api/team", { team: newTeam, userId: userId }).then(function (response) {
				return response.data;
			});
		},
		getUserTeams: function (userId) {
			return $http.get("/api/team/user/" +userId).then(function (response) {
				return response.data;
			});
		},
		addMember: function (teamId, userId) {
			return $http.put("/api/team", {teamId: teamId, userId: userId}).then(function (response) {
				return response.data;
			});
		},
		get: function (teamId) {
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