(function() {
    'use strict';

    angular
        .module('app')
        .factory('patientCheckInFactory', patientCheckInFactory);

    //injecting parameters to the factory
    patientCheckInFactory.$inject = ['$http', '$q', 'toastr', 'apiUrl'];

    function patientCheckInFactory($http, $q, toastr, apiUrl) {
        var service = {
            getActivePatientCheckIns: getActivePatientCheckIns,
            getPatientCheckIns: getPatientCheckIns
        };

        return service;

        function getActivePatientCheckIns() {
            var deferred = $q.defer();

            //communicating with the api
            $http.get('http://localhost:61490/api/patientcheckins/queue').then(
                function(response) {
                    deferred.resolve(response.data);
                },
                function(err) {
                    toastr.error('Oh no! An error has occurred. Please try again.');
                    deferred.reject(err);
                }
            );

            //returns the array
            return deferred.promise;
        }

        function getPatientCheckIns() {
            var deferred = $q.defer();

            //communicating with the api
            $http.get('http://localhost:61490/api/patientcheckins').then(
                function(response) {
                    deferred.resolve(response.data);
                },
                function(err) {
                    toastr.error('Oh no! An error has occurred. Please try again.');
                    deferred.reject(err);
                }
            );

            //returns the array
            return deferred.promise;
        }

    }
})();