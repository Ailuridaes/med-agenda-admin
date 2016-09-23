(function() {
    'use strict';

    angular
        .module('app')
        .factory('assignmentFactory', assignmentFactory);

    assignmentFactory.$inject = ['$http', '$q', 'toastr', 'apiUrl'];

    /* @ngInject */
    function assignmentFactory($http, $q, toastr, apiUrl) {
        var service = {
            getByAssignmentId: getByAssignmentId
        };
        return service;

        ////////////////

        function getByAssignmentId(id) {
        	var defer = $q.defer();

        	$http.get(apiUrl + '/assignments/' + id)
        		.then(
        			function(response) {
        				defer.resolve(response.data);
        			},
        			function(error) {
        				defer.reject(error);
        				toastr.error('Error getting appointment record detail', 'Error');
        			}
        		);

        	return defer.promise;
        }
    }
})();
