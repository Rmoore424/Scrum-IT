'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/',
        controller: 'LoginCtrl',
        templateUrl: 'js/login/login.html'
    });

});

app.controller('LoginCtrl', function ($scope, $state, AuthService, $cookieStore, UserStatusFactory) {
	$scope.loginUser = function (user) {
        AuthService.login(user).then(function (returnedUser) {
            if (returnedUser.email) {
                UserStatusFactory.isLoggedIn = true;
                    $cookieStore.put('user', returnedUser._id);
                    $state.go('home');
            }
        });
    };
});