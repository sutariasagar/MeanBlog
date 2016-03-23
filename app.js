(function() {
	var app = angular.module("flapperNews", ["ui-router"]);

	app.config([
		'$stateProvider',
		'$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
			$stateProvider
				.state('home', {
					url: '/home',
					templateUrl: '/home.html',
					controller: 'MainCtrl'
				});
			$urlRouterProvider.otherwise('home');
		}
	]);

	/* Posts service */
	app.factory("posts", [function() {
		return {
			posts: [{
				title: "post1",
				upvotes: 5
			}, {
				title: "post2",
				upvotes: 2
			}, {
				title: "post3",
				upvotes: 15
			}, {
				title: "post4",
				upvotes: 9
			}, {
				title: "post5",
				upvotes: 4
			}]
		};
	}]);

	/* Main Controller */
	app.controller("MainCtrl", [
		"$scope",
		"posts",
		function($scope, posts) {
			$scope.posts = posts.posts;
			$scope.addPost = function() {
				if ($scope.title && $scope.title !== "") {
					$scope.posts.push({
						title: $scope.title,
						link: $scope.link,
						upvotes: 0
					});
					$scope.title = "";
					$scope.link = "";
				}
			};
			$scope.increamentUpvotes = function(post) {
				post.upvotes += 1;
			};
		}
	]);
})();