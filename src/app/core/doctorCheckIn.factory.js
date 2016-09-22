(function() {
    'use strict';

    angular
        .module('app')
        .factory('doctorCheckInFactory', doctorCheckInFactory);

    doctorCheckInFactory.$inject = ['$http', '$q', 'apiUrl', 'toastr'];

    /* @ngInject */
    function doctorCheckInFactory($http, $q, apiUrl, toastr) {
        var service = {
            getAllDoctorCheckIns: getAllDoctorCheckIns
        };
        return service;

        ////////////////

        function getAllDoctorCheckIns() {
            var defer = $q.defer();
        
            $http.get(apiUrl + '/doctorCheckIns')
                .then(
                    function(response) {
                        defer.resolve(response.data);
                    },
                    function(error) {
                        defer.reject(error);
                        toastr.error('Error getting doctor check ins', 'Error');
                    }
                );
        
            return defer.promise;
        }
    }
})();