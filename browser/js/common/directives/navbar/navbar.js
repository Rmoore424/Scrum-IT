'use strict';
app.directive('navbar', function () {
    return {
        restrict: 'E',
        controller: 'NavCtrl',
        templateUrl: 'js/common/directives/navbar/navbar.html'
    };
});

app.controller('NavCtrl', function ($scope, $state, $cookieStore, AuthService, UserStatusFactory, TeamFactory, TaskFactory) {

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
            UserStatusFactory.isLoggedIn = false;
            $cookieStore.remove('user');
            $state.go('login');
    }

    $scope.toAdd = function (option) {
        $scope.add = option;
    }

    $scope.addNewTeam = function (newTeam) {
        var user = $cookieStore.get('user');
        console.log(user);
        TeamFactory.createTeam(newTeam, user).then(function (team) {
            console.log(team);
            $scope.add = false;
        });
    }

    $scope.addNewTask = function (newTask) {
        var user = $cookieStore.get('user');
        TaskFactory.createTask(newTask, user).then(function (task) {
            console.log(task);
            $scope.add = false;
        });
    }

    $scope.goHome = function () {
        $state.go('home');
    }
});

