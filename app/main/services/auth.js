angular.module('main')
.factory('auth', function($http, $window) {
	var auth = {};

	auth.saveToken = function(token) {
		$window.sessionStorage['token'] = token;
	};

	auth.getToken = function() {
		return $window.sessionStorage['token'];
	}

	auth.isLoggedIn = function() {
		var token = auth.getToken();
    
	};


	auth.register = function(user) {
		return $http.post('/api/v1/accounts/', user).success(function(data) {
			auth.saveToken(data.token);
		});
	};

	auth.logIn = function(user) {
		return $http.post('/login', user).success(function(data) {
			auth.saveToken(data.token);
		});
	};

	auth.logOut = function() {
    return $http.post('/api/v1/auth/logout/').success(function(data) {
      $window.sessionStorage.removeItem('token');
    });
	};

	return auth;
});
