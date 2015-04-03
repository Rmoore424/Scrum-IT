"use strict";
app.factory('UserFactory', function ($http) {
	return {
		createUser: function (user) {
			return $http.post('/api/user', user).then(function (response) {
				return response.data;
			});
		},
		getUsers: function () {
			return $http.get('/api/user').then(function (response) {
				return response.data;
			});
		},
		getUser: function (email) {
			return $http.get('api/user/' +email).then(function (response) {
				return response.data;
			});
		}
	};
});