(function() {
    'use strict';

    angular
        .module('app', ['ui.router', 'toastr', 'ngBootbox', 'ui.bootstrap', 'multipleSelect'])
        .config(function($stateProvider, $urlRouterProvider){

            $urlRouterProvider.otherwise('/doctors');


            //////////////////////////////////////////////
            //       Doctor pages                       //
            //////////////////////////////////////////////
        	$stateProvider
            	.state('doctors', {
                    url: '/doctors',
                    abstract: true,
                    template: '<div ui-view></div>'
                })
                    .state('doctors.grid', {
                            url: '/grid',
                            templateUrl: 'app/doctor/doctor.grid.html',
                            controller: "DoctorGridController as doctorGrid"
                        })
                    .state('doctors.detail', {
                        url: '/detail?doctorId',
                        templateUrl: 'app/doctor/doctor.detail.html',
                        controller: "DoctorDetailController as doctorDetail"
                    })

        });

})();
