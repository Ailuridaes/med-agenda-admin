(function() {
    'use strict';

    angular
        .module('app')
        .factory('adminDashboardFactory', adminDashboardFactory);

    adminDashboardFactory.$inject = [
            '$http', 
            '$q', 
            'toastr',
            'apiUrl'
            ];

    /* @ngInject */
    function adminDashboardFactory($http, $q, toastr, apiUrl) {
        var service = {
            getMonthlyPatientSummary: getMonthlyPatientSummary,
            getDoctorSpecialties: getDoctorSpecialties,
            getPatientConditions: getPatientConditions
        };
        return service;

        ////////////////

        function getMonthlyPatientSummary() {
            var defer = $q.defer();
        
            $http.get(apiUrl + '/dashboard/monthlyPatientSummary')
                .then(
                    function(response) {
                        defer.resolve(response.data);
                    },
                    function(error) {
                        defer.reject(error);
                        toastr.error('Getting monthly patient summary from database failed', 'Error');
                    }
                );
        
                return defer.promise;       
        }

        function getDoctorSpecialties() {
            var defer = $q.defer();

            $http.get(apiUrl + '/dashboard/doctorSpecialities')
                .then(
                    function(response) {
                        defer.resolve(response.data);
                    },
                    function(error) {
                        defer.reject(error);
                        toastr.error('Getting doctor specialties from database failed', 'Error');
                    }
                );

            return defer.promise;
        }

                function getPatientConditions() {
            var defer = $q.defer();

            $http.get(apiUrl + '/dashboard/patientConditions')
                .then(
                    function(response) {
                        defer.resolve(response.data);
                    },
                    function(error) {
                        defer.reject(error);
                        toastr.error('Getting patient conditions from database failed', 'Error');
                    }
                );

            return defer.promise;
        }
    }
})();