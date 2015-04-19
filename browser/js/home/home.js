'use strict';
app.config(function ($stateProvider) {
	$stateProvider.state('home', {
		url: '/home',
		controller: 'HomeCtrl',
		templateUrl: 'js/home/home.html'
	});
});

app.controller('HomeCtrl', function ($scope, $state, $cookieStore, User, Team, SubTask, Task, Page, socket) {

	socket.on('updateTeam', function (data) {
		var teamExists = false;
		for (var i = 0; i < $scope.teams.length; i++) {
			if ($scope.teams[i]._id == data.team._id) {
				$scope.teams[i].members.push(data.user);
				teamExists = true;
			}
		}
		if (teamExists == false && data.user._id == $scope.userId) {
			$scope.teams.push(data.team);
		}
	});
	socket.on('updateTasks', function (data) {
		if ($scope.currentTeamIndex == data.index) {
			Page.team.assignments.push(data.task);
		}	
	});

	$scope.userId = $cookieStore.get('user');
	// UserFactory.getUsers().then(function (users) {
	// 	$scope.users = users;
		Team.getUserTeams($scope.userId).then(function (teams) {
			$scope.teams = teams;
		});
	// });

	$scope.showAddMember = function (index) {
		$scope.teamIndex = index;
		$scope.taskIndex = -1;
	};

	$scope.showAddTask = function (index) {
		$scope.taskIndex = index;
		$scope.teamIndex = -1;
	}

	$scope.showAddTeam = function () {
		$scope.add = true;
	}

	$scope.addTeam = function (newTeam) {
		$scope.add = false;
		$scope.newTeam = "";
		Team.create(newTeam).then(function (team) {
			Team.addMember(team._id, $scope.userId).then(function (populatedTeam) {
				$scope.teams.push(populatedTeam);
			});
		});
	}

	$scope.addMember = function (email, index, team) {
		$scope.teamIndex = -1;
		$scope.newMember = {};
		User.getOne(email).then(function (user) {
			$scope.teams[index].members.push(user);
			Page.team.members.push(user);
			socket.emit('newMember', {user: user, team: team});
			Team.addMember(team._id, user._id);
		});
	}
	$scope.addTask = function (teamId, index, newTask) {
		$scope.taskIndex = -1;
		$scope.newAddedTask = "";
		Task.create(teamId, newTask).then(function (task) {
			$scope.teams[index].assignments.push(task);
			Page.team.assignments.push(task);
			socket.emit('newTask', {task: task, index: index});
		});
	}

	$scope.setCurrentTeam = function (teamId, index) {
		$scope.currentTeamIndex = index;
		$state.go('home.page', {id: teamId});
	}

	$scope.resetForm = function (form) {
		form = {};
	}
});
