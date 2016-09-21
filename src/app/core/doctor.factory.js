(function() {
    'use strict';

    angular
        .module('app')
        .factory('doctorFactory', doctorFactory);

    doctorFactory.$inject = ['$http', '$q', 'toastr', 'apiUrl'];

    /* @ngInject */
    function doctorFactory($http, $q, toastr, apiUrl) {
        var service = {
            addDoctor: addDoctor,
            getAllDoctors: getAllDoctors,
            getByDoctorId: getByDoctorId,
            updateDoctor: updateDoctor
        };
        return service;

        ////////////////

        function addDoctor(doctor) {
        	var defer = $q.defer();

        	$http.post(apiUrl + '/doctors/', doctor)
        		.then(
        			function(response) {
        				defer.resolve(response.data);
        			},
        			function(error) {
        				defer.reject(error);
        				toastr.error('Error adding doctor', 'Error');
        			}
        	);

        	return defer.promise;
        }

    	function getAllDoctors() {
    		var defer = $q.defer();

    		$http.get(apiUrl + '/doctors/all')
    			.then(
    				function(response) {
    					defer.resolve(response.data);
    				},
    				function(error) {
    					defer.reject(error);
    					toastr.error('Error getting doctors', 'Error');
    				}
    		);

    		return defer.promise;
        }

    	function getByDoctorId(id) {
			var defer = $q.defer();

			$http.get(apiUrl + '/doctors/' + id)
				.then(
					function(response) {
						defer.resolve(response.data);
					},
					function(error) {
						defer.reject(error);
						toastr.error('Error getting doctor detail', 'Error');
					}
            );

    		return defer.promise;
        }

    	function updateDoctor(doctor) {
    	    var defer = $q.defer();

    		$http.put(apiUrl + '/doctors/' + doctor.doctorId, doctor)
    			.then(
    				function() {
    					defer.resolve();
    					toastr.success('Successfully updated doctor', 'Saved');
    				},
    				function(error) {
    					defer.reject(error);
    					toastr.error('Error updating doctor', 'Error');
    				}
    		);

    		return defer.promise;
        }
    }
})();
