'use strict';
app.directive('navbar', function () {
    return {
        restrict: 'E',
        controller: 'NavCtrl',
        templateUrl: 'js/common/directives/navbar/navbar.html'
    };
});

app.controller('NavCtrl', function ($scope, $state, $cookieStore, AuthService, UserStatus, Team, Task) {

	$scope.menuItems = [
        { label: 'Home', state: 'home' },
    ];

    $scope.userOptions = [
        { label: 'Add Task', state: 'task'},
        { label: 'Add Team', state: 'team'}
    ];

    $scope.generalOptions = [
        { label: 'Log In', state: 'login'},
        { label: 'Sign Up', state: 'signup'}
    ];

    $scope.logOut = function () {
            AuthService.logout();
            UserStatus.isLoggedIn = false;
            $cookieStore.remove('user');
            $state.go('login');
    }

    $scope.goHome = function () {
        $state.go('home');
    }
});

