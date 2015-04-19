"use strict";
app.factory('User', function ($http) {
	return {
		create: function (user) {
			return $http.post('/api/user', user).then(function (response) {
				return response.data;
			});
		},
		getAll: function () {
			return $http.get('/api/user').then(function (response) {
				return response.data;
			});
		},
		getOne: function (email) {
			return $http.get('api/user/' +email).then(function (response) {
				return response.data;
			});
		}
	};
});