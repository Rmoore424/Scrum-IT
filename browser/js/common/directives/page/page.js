'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('home.page', {
		url: '/:id',
		controller: "PageCtrl",
		templateUrl: 'js/common/directives/page/page.html'
	})
})

app.controller('PageCtrl', function ($scope, socket, $stateParams, Team, Page) {

	$scope.page = Page;

	$scope.join = function () {
		socket.emit('join', $stateParams.id);
	}

	$scope.join();

	socket.on('addTask', function (task) {
		Page.team.assignments.push(task);
	})

	socket.on("deleteTask", function (index) {
		Page.team.assignments.splice(index, 1);
	});

	Team.getOne($stateParams.id).then(function (responseObj) {
		Page.team = responseObj.team;
		Page.team.assignments = responseObj.tasks;
	});
});