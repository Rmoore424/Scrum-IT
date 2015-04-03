'use strict';
app.config(function ($stateProvider) {
	$stateProvider.state('signup', {
		url: '/signup',
		controller: 'SignupController',
		templateUrl: 'js/signup/signup.html'
	});
});


app.controller('SignupController', function ($scope, $state, $cookieStore, UserFactory, UserStatusFactory, AuthService) {
	
	$scope.signup = function (user) {
		UserFactory.createUser(user).then(function (responseObj) {
			if (responseObj.error) {
				$scope.duplicateUser = true;
			}
			else {
				UserStatusFactory.isLoggedIn = true;
				AuthService.login(user).then(function (returnedUser) {
					$cookieStore.put('user', returnedUser._id);
					$state.go('home');			
				});
	     	}
		});
	};
});