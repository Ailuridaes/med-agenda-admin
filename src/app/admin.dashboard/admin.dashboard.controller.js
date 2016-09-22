(function() {
    'use strict';

    angular
        .module('app')
        .controller('AdminDashboardController', AdminDashboardController);

    AdminDashboardController.$inject = [
        '$stateParams',
        '$state',
        'toastr',
        'adminDashboardFactory',
        'doctorFactory',
        'patientFactory'
    ];

    // /* @ngInject */
    function AdminDashboardController($stateParams, $state, toastr, adminDashboardFactory, doctorFactory, patientFactory) {
        var vm = this;

        vm.charts = {
            colors: [],
            labels: [],
            data: [],
            options: {}
        };

        vm.doctors = [];
        vm.patients = [];

        activate();

        ///////////////

        function activate() {
            adminDashboardFactory.getMonthlyPatientSummary().then(
                function(response) {
                    angular.extend(vm.charts.monthlyPatientSummary, response);
                });

            adminDashboardFactory.getDoctorSpecialties().then(
                function(response) {
                    angular.extend(vm.charts.currentDoctorSpecialties, response);
                });

            adminDashboardFactory.getPatientConditions().then(
                function(response) {
                    angular.extend(vm.charts.
                        yearlyPatientConditions, response);
                });

            doctorFactory.getAllDoctors().then(
                function(response) {
                    vm.doctors = response;
                });

            patientFactory.getPatients().then(
                function(response) {
                    vm.patients = response;
                });
        }

        // Patient monthly summary line chart 
        vm.charts = {
            monthlyPatientSummary: {
                labels: [],
                data: [],
                overrides: [{
                    label: 'Total Patients in ER',
                    borderWidth: 5,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    type: 'line'
                }, {
                    label: 'Total Doctors Checked In',
                    borderWidth: 1,
                    type: 'bar'
                }],
                options: {
                    responsive: true,
                    labels: {
                        fontColor: 'rgb(0, 0, 0)',
                    }
                }
            },

            // Doctor specialty pie chart 
            currentDoctorSpecialties: {
                options: {
                    responsive: true,
                    legend: {
                        display: true,
                        labels: {
                            fontColor: 'rgb(0, 0, 0)',
                        }
                    }
                }
            },

            // Patient conditions pie chart
            yearlyPatientConditions: {
                options: {
                    responsive: true,
                    legend: {
                        display: true,
                        labels: {
                            fontColor: 'rgb(0, 0, 0)',
                        }
                    }
                }
            }
        };
    }
})();
