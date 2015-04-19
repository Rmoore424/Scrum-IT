'use strict';
app.config(function ($stateProvider) {
	$stateProvider.state('signup', {
		url: '/signup',
		controller: 'SignupController',
		templateUrl: 'js/signup/signup.html'
	});
});


app.controller('SignupController', function ($scope, $state, $cookieStore, User, UserStatus, AuthService) {
	
	$scope.signup = function (user) {
		User.create(user).then(function (responseObj) {
			if (responseObj.error) {
				$scope.duplicateUser = true;
			}
			else {
				UserStatus.isLoggedIn = true;
				AuthService.login(user).then(function (returnedUser) {
					$cookieStore.put('user', returnedUser._id);
					$state.go('home');			
				});
	     	}
		});
	};
});