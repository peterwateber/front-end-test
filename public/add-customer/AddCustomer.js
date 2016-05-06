window.app.directive('addCustomer', ['$rootScope', '$http', '$timeout',

	function($rootScope, $http, $timeout) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				onAdded: '&'
			},
			templateUrl: '/add-customer/add-customer.html',
			link: function(scope) {

				scope.products = [
					{
						name: 'Grammatical advice'
					},
					{
						name: 'Magnifying glass repair'
					},
					{
						name: 'Cryptography advice'
					}
	            ];

				scope.addCustomer = function() {
					if (scope.product && scope.name) {
						var req = $timeout(function() {
							$http.post('/api/customer/add', {
								name: scope.name,
								product: scope.product
							}).then(function(result) {
								$rootScope.customers = result.data;
								scope.name = "";
								scope.product = "";
							});
							$timeout.cancel(req);
						}, 200);
					} else {
						if (!scope.name) {
							$rootScope.errorMessage = 'Please enter the customer\'s name';
						} else if (!scope.product) {
							$rootScope.errorMessage = 'Please select a product';
						}
						$("#modal").modal();
					}
				};
			}
		};
	}
]);
