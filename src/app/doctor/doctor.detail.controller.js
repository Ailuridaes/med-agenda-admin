(function() {
    'use strict';

    angular
        .module('app')
        .controller('DoctorDetailController', DoctorDetailController);

    DoctorDetailController.$inject = ['doctorFactory', 'assignmentFactory'];

    /* @ngInject */
    function DoctorDetailController(doctorFactory, assignmentFactory) {
        var vm = this;
        vm.title = 'DoctorDetailController';

        // properties
        //declaring variables

        // methods
        //vm.addWhatever = addWhatever;

        activate();

        ////////////////

        function activate() {

        	doctorFactory.getByDoctorId().then(
        		function (doctorId) {
        			vm.doctor= data;
        		}
        	);

        	assignmentFactory.getByAssignmentId().then(
        		function (assignmentId) {
        			vm.assignment = data;
        		}
        	);
        }
    }
})();