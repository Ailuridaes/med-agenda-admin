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
            addPatient: addPatient,
            deletePatient: deletePatient,
            editPatient: editPatient
        };

        return service;

        function getPatients() {
            var deferred = $q.defer();

            //communicating with the api
            $http.get(apiUrl + '/patients').then(
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
            $http.get(apiUrl + '/patients' + id).then(
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


        function addPatient(patient) {
            var deferred = $q.defer();

            //communicating with the api
            $http.post(apiUrl + '/patients', patient).then(
                function(response) {
                    toastr.success('The patient was successfully added to the database.');
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
            $http.put(apiUrl + '/patients' + patient.patientId, patient).then(
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

        function deletePatient(patient) {
            var deferred = $q.defer();

            //communicating with the api
            $http.delete(apiUrl + '/patients' + patient.patientId).then(
                function(response) {
                    toastr.success('This patient was successfully removed from the database.');
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