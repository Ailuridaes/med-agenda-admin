(function() {
    'use strict';

    angular
        .module('app')
        .factory('patientFactory', patientFactory);

    //injecting parameters to the factory
    patientFactory.$inject = ['$http', '$q', 'toastr', 'apiUrl'];

    function patientFactory($http, $q, toastr, apiUrl) {
        var service = {
            getPatients: getPatients,
            getPatientById: getPatientById,
            editPatient: editPatient
        };

        return service;

        function getPatients() {
            var deferred = $q.defer();

            //communicating with the api
            $http.get('http://localhost:61490/api/patients').then(
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

        function getPatientById(id) {
            var deferred = $q.defer();

            //communicating with the api
            $http.get('http://localhost:61490/api/patients/' + id).then(
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


        function editPatient(patient) {
            var deferred = $q.defer();

            //communicating with the api
            $http.put('http://localhost:61490/api/patients/' + patient.patientId, patient).then(
                function(response) {
                    toastr.success("This patient's information has been successfully edited.");
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
