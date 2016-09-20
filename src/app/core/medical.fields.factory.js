(function() {
    'use strict';

    angular
        .module('app')
        .factory('medicalFieldsFactory', medicalFieldsFactory);

    medicalFieldsFactory.$inject = ['$http', '$q', 'apiUrl','toastr'];

    /* @ngInject */
    function medicalFieldsFactory($http, $q, apiUrl, toastr) {
        var service = {
            getAllMedFields: getAllMedFields
        };
        return service;

        ////////////////

        function getAllMedFields() {
        	var defer = $q.defer();
        
        	$http.get(apiUrl + '/medicalFields')
        		.then(
        			function(response) {
        				defer.resolve(response.data);
        			},
        			function(error) {
        				defer.reject(error);
        				toastr.error('Error getting medical fields', 'Error');
        			}
        		);
        
        	return defer.promise;
        }
    }
})();