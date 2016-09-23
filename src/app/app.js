(function() {
    'use strict';

    angular
        .module('app', [
            'ui.router',
            'toastr',
            'ngBootbox',
            'ui.bootstrap',
            'chart.js',
            'multipleSelect',
            'uiRouterStyles',
            'toggle-switch'
        ])

        // Configure all charts
        .config(['ChartJsProvider', function (ChartJsProvider) {

            ChartJsProvider.setOptions({
              chartColors: [
                  '#FF5252',
                  '#0000FF',
                  '#803690',
                  '#00ADF9',
                  '#DCDCDC',
                  '#46BFBD',
                  '#FDB45C',
                  '#949FB1',
                  '#4D5360'
              ],
              labels: {
                    fontColor: 'rgb(0, 0, 0)',
              },
              responsive: true
            });
            // Configure all line charts
            ChartJsProvider.setOptions(
                // Show lines for line graphs
                'line', {
                  showLines: true,
                },
                // Show legend for pie charts
                'pie', {
                  legend: {
                        display: true
                }
            });
          }])

        // Configure all stateProviders
        .config(function($stateProvider, $urlRouterProvider){
        	$urlRouterProvider.otherwise('/login');
            $stateProvider
        /////// LOGIN STATE - DEFAULT  ////////
                .state('login', {
                    url: '/login',
                    // controller: 'AdminLoginController as adminLogin',
                    templateUrl: '/app/admin.login/admin.login.html',
                      data: {
                        css: 'styles/login.background.css'
                      }
                })

        /////// ADMIN STATE  ////////
                .state('admin', {
                    url: '/admin',
                    abstract: true,
                    templateUrl: '/app/layout/admin.shell.html'
                })
                    // Admin dashboard  page
                    .state('admin.dashboard', {
                        url: '/dashboard',
                        controller: 'AdminDashboardController as adminDashboard',
                        templateUrl: '/app/admin.dashboard/admin.dashboard.html'
                    })

            /////// PATIENT STATE  ////////
                    .state('admin.patient', {
                       url: '/patient',
                       abstract: true,
                       template: '<div ui-view></div>'
                    })
                       .state('admin.patient.grid', {
                           url: '/grid',
                           controller: 'PatientGridController as patientGrid',
                           templateUrl: 'app/patient/patient.grid.html'
                       })
                       .state('admin.patient.detail', {
                           url: '/detail?patientId',
                           controller: 'PatientDetailController as patientDetail',
                           templateUrl: 'app/patient/patient.detail.html'
                       })

            /////// DOCTOR STATE  ////////
                    .state('admin.doctor', {
                       url: '/doctor',
                       abstract: true,
                       template: '<div ui-view></div>'
                    })
                       .state('admin.doctor.grid', {
                               url: '/grid',
                               templateUrl: 'app/doctor/doctor.grid.html',
                               controller: "DoctorGridController as doctorGrid"
                           })
                       .state('admin.doctor.detail', {
                           url: '/detail?doctorId',
                           templateUrl: 'app/doctor/doctor.detail.html',
                           controller: "DoctorDetailController as doctorDetail"
                       });
        });
})();
