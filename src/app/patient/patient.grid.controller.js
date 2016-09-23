(function() {
    'use strict';

    angular
        .module('medApp')
        .controller('PatientGridController', PatientGridController);

    //injecting movie factory to search controller
    PatientGridController.$inject = ['patientFactory', 'patientCheckInFactory', '$ngBootbox'];

    function PatientGridController(patientFactory, patientCheckInFactory, $ngBootbox) {
        var vm = this;

        activate();

        function activate() {
            patientFactory.getPatients().then(
                function(patients) {
                    vm.patients = patients;
                },
                function(error) {}
            );
        }

        function activateAgain() {
            patientCheckInFactory.getPatientCheckIns().then(
                function(checkins) {
                    vm.checkins = checkins;
                },
                function(error) {}
            );
        }

        activateAgain();


    }

})();
