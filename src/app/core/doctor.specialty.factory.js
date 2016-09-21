(function() {
    'use strict';

    angular
        .module('app')
        .factory('specialtyFactory', specialtyFactory);

    specialtyFactory.$inject = ['$http', '$q', 'apiUrl', 'toastr'];

    /* @ngInject */
    function specialtyFactory($http, $q, apiUrl, toastr) {
        var service = {
            addSpecialty: addSpecialty
        };
        return service;

        ////////////////

        function addSpecialty(specialty) {
        	var defer = $q.defer();
        
        	$http.post(apiUrl + '/specialties', specialty)
        		.then(
        			function(response) {
        				defer.resolve(response.data);
        				toastr.success('Successfully added specialty', 'Saved');
        			},
        			function(error) {
        				defer.reject(error);
        				toastr.error('Error adding specialty', 'Error');
        			}
        		);
        
        	return defer.promise;
        }
    }
})();