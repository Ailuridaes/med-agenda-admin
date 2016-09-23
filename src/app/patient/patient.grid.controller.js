(function() {
    'use strict';

    angular
        .module('app')
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
                    // console.log(patients);
                   
                },
                function(error) {}
            );
        }

        function activateAgain() {
            patientCheckInFactory.getActivePatientCheckIns().then(
                function(checkins) {
                    vm.checkins = checkins;
                    console.log(checkins);
                },
                function(error) {}
            );
        }

        activateAgain();


    }

})();
