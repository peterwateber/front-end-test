/**
 * The <customer> directive is responsible for:
 * - serving customer
 * - calculating queued time
 * - removing customer from the queue
 */
window.app.directive('customer', ['$http', '$rootScope',
	function($http, $rootScope) {
		return {
			restrict: 'E',
			scope: {
				customer: '=',
				served: '=',
				onRemoved: '&',
				onServed: '&'
			},
			templateUrl: '/customer/customer.html',
			controller: function($scope) {
				$scope.formateDate = function(date) {
					var d = new Date(date);
					var monthNames = ["January", "February", "March",
	  								"April", "May", "June", "July",
	  								"August", "September", "October",
	  								"November", "December"];

					return monthNames[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear() + ". " + d.getHours() + ":" + d.getMinutes();
				};
			},
			link: function(scope) {

				// calculate how long the customer has queued for
				scope.queuedTime = new Date() - new Date(scope.customer.joinedTime);

				scope.remove = function() {
					$http({
						method: 'DELETE',
						url: '/api/customer/remove',
						params: {
							id: scope.customer.id
						}
					}).then(function(res) {
						scope.onRemoved();
					});
				};

				scope.serve = function() {
					var data = {
						id: scope.id,
						name: scope.name,
						product: {
							name: scope.product
						}
					};
					$http.post('/api/customer/serve', {
						id: scope.id
					}).then(function(res) {
						$rootScope.customers = res.data.customers;
						$rootScope.customersServed = res.data.servedCustomers;
					});
				};
			}
		};
	}
]);
