window.app.directive('addCustomer', ['$rootScope', '$http', '$timeout',

	function($rootScope, $http, $timeout) {
		return {
			restrict: 'E',
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
							});
							$timeout.cancel(req);
						}, 200);
					} else {
						if (!scope.product) {
							alert('Please select a product!');
						}
						if (!scope.name) {
							alert('Please enter the customer\'s name');
						}
					}
				};
			}
		};
	}
]);
