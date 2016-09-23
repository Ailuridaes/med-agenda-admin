(function() {
    'use strict';


    angular
        .module('app', ['ui.router', 'toastr', 'ngBootbox', 'ui.bootstrap', 'toggle-switch'])
        .config(function($urlRouterProvider, $stateProvider) {
            
            $urlRouterProvider.otherwise('/patient/grid');

            $stateProvider
                .state('patient', {
                    url: '/patient',
                    abstract: true,
                    template: '<div ui-view></div>'
                })
                .state('patient.grid', {
                    url: '/grid',
                    controller: 'PatientGridController as patientGrid',
                    templateUrl: 'app/patient/patient.grid.html'
                })
                .state('patient.detail', {
                    url: '/detail?patientId',
                    controller: 'PatientDetailController as patientDetail',
                    templateUrl: 'app/patient/patient.detail.html'
                });
        });
})();