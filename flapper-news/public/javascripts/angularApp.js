(function() {
	var app = angular.module('flapperNews', ['ui.router']);

	app.config([
		'$stateProvider',
		'$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
			$stateProvider
				.state('home', {
					url: '/home',
					templateUrl: '/home.html',
					controller: 'MainCtrl'
				})
				.state('posts', {
					url: '/posts/{id}',
					templateUrl: '/posts.html',
					controller: 'PostsCtrl'
				});
			$urlRouterProvider.otherwise('home');
		}
	]);

	/* Posts service */
	app.factory('posts', [function() {
		return {
			posts: [{
				title: 'post1',
				upvotes: 5
			}, {
				title: 'post2',
				upvotes: 2
			}, {
				title: 'post3',
				upvotes: 15
			}, {
				title: 'post4',
				upvotes: 9
			}, {
				title: 'post5',
				upvotes: 4
			}]
		};
	}]);

	/* Main Controller */
	app.controller('MainCtrl', [
		'$scope',
		'posts',
		function($scope, posts) {
			$scope.posts = posts.posts;
			$scope.addPost = function() {
				if ($scope.title && $scope.title !== '') {
					$scope.posts.push({
						title: $scope.title,
						link: $scope.link,
						upvotes: 0,
						comments: [{
							author: 'Joe',
							body: 'Cool post!',
							upvotes: 0
						}, {
							author: 'Bob',
							body: 'Great idea but everything is wrong!',
							upvotes: 0
						}]
					});
					$scope.title = '';
					$scope.link = '';
				}
			};
			$scope.increamentUpvotes = function(post) {
				post.upvotes += 1;
			};
		}
	]);

	/* Posts Controller */
	app.controller('PostsCtrl', [
		'$scope',
		'$stateParams',
		'posts',
		function($scope, $stateParams, posts) {
			$scope.post = posts.posts[$stateParams.id];

			$scope.addComment = function() {
				if($scope.body !== '') {
					if(!$scope.post.comments) {
						$scope.post.comments = [];
					}
					$scope.post.comments.push({
						body: $scope.body,
						author: 'user',
						upvotes: 0
					});
					$scope.body = '';
				}
			};
		}
	]);
})();