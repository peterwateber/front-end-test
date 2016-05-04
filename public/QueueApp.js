/**
 * Bonus points - manipulating the without waiting for the
 * server request
 */

window.app.controller('QueueCtrl', ['$rootScope', '$scope', '$http',
	function($rootScope, $scope, $http) {

		$rootScope.customers = [];
		$rootScope.customersServed = [];
		_getCustomers();
		_getServedCustomers();

		$scope.onCustomerAdded = function() {
			_getCustomers();
		};

		$scope.onCustomerRemoved = function() {
			_getCustomers();
		};

		$scope.onCustomerServed = function() {
			_getCustomers();
			_getServedCustomers();
		};

		function _getServedCustomers() {
			return $http.get('/api/customers/served').then(function(res) {
				$rootScope.customersServed = res.data;
			});
		}

		function _getCustomers() {
			return $http.get('/api/customers').then(function(res) {
				$rootScope.customers = res.data;
			});
		}
	}
]);
