/**
 * The <customer> directive is responsible for:
 * - serving customer
 * - calculating queued time
 * - removing customer from the queue
 */
window.app.directive('customer', ['$http', '$rootScope', '$timeout',

	function($http, $rootScope, $timeout) {
		return {
			restrict: '^E',
			replace: true,
			scope: {
				customer: '=',
				served: '=',
				onRemoved: '&',
				onServed: '&'
			},
			templateUrl: '/customer/customer.html',
			link: function(scope, ele) {

				// calculate how long the customer has queued for
				var queuedTime = new Date(scope.customer.joinedTime);
				scope.queuedTime = queuedTime.toISOString();

				scope.remove = function() {
					$http({
						method: 'DELETE',
						url: '/api/customer/remove',
						params: {
							id: scope.id
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
						scope.onServed();
						$timeout(function(){
							$(".timeago").timeago();
						}, 200);
					});
				};
			}
		};
	}
]);
