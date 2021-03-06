(function() {
    'use strict';

    angular
        .module('app')
        .factory('specialtyFactory', specialtyFactory);

    specialtyFactory.$inject = ['$http', '$q', 'apiUrl', 'toastr'];

    /* @ngInject */
    function specialtyFactory($http, $q, apiUrl, toastr) {
        var service = {
            addSpecialty: addSpecialty,
            removeSpecialty: removeSpecialty,
            updateSpecialty: updateSpecialty
        };
        return service;

        ////////////////

        function addSpecialty(specialty) {
            var defer = $q.defer();

            $http.post(apiUrl + '/specialties', specialty)
                .then(
                    function(response) {
                        defer.resolve(response.data);
                    },
                    function(error) {
                        defer.reject(error);
                        toastr.error('Error adding specialty', 'Error');
                    }
                );

            return defer.promise;
        }

        function removeSpecialty(specialty) {
            var defer = $q.defer();

            $http.delete(apiUrl + '/specialties/' + specialty.doctorId + '/' + specialty.medicalFieldId)
                .then(
                    function(response) {
                        defer.resolve(response.data);
                    },
                    function(error) {
                        defer.reject(error);
                        toastr.error('Error deleting specialty', 'Error');
                    }
                );

            return defer.promise;
        }

        function updateSpecialty(specialty) {
            var defer = $q.defer();

            $http.put(apiUrl + '/specialties/' + specialty.doctorId + '/' + specialty.medicalFieldId, specialty)
                .then(
                    function() {
                        defer.resolve();
                    },
                    function(error) {
                        defer.reject(error);
                        toastr.error('Error updating specialty', 'Error');
                    }
                );

            return defer.promise;
        }
    }
})();
