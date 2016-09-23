(function() {
    'use strict';

    angular
        .module('medApp')
        .controller('PatientDetailController', PatientDetailController);

    //injecting movie factory to search controller
    PatientDetailController.$inject = ['patientFactory', 'patientCheckInFactory', 'contactFactory', '$ngBootbox', '$stateParams', '$scope'];

    function PatientDetailController(patientFactory, patientCheckInFactory, contactFactory, $ngBootbox, $stateParams, $scope) {
        var vm = this;

        vm.currentPatientId = $stateParams.patientId;
        vm.doNotWatch = false;

        function activate(id) {
            patientFactory.getPatientById(id).then(
                function(patient) {
                    vm.patient = patient;
                    vm.originalPatient = angular.copy(patient);
                    console.log(vm.patient);
                    $scope.$watch(function() {
                        return vm.patient.isDisabled;
                    }, function(currentValue, newValue) {
                        if (vm.doNotWatch) {
                            vm.doNotWatch = false;
                            return;
                        }
                        if (currentValue !== newValue) {
                            $ngBootbox.confirm("Are you sure you want to edit this patient's activity status?")
                                .then(function() {
                                    vm.editPatient(vm.patient);
                                    console.log('Confirmed!');
                                }, function() {
                                    vm.doNotWatch = true;
                                    vm.patient.isDisabled = vm.originalPatient.isDisabled;
                                    console.log('Confirm dismissed!');
                                });
                        }
                    });
                },
                function(error) {}
            );
        }

        activate(vm.currentPatientId);

        function activateAgain() {
            contactFactory.getContacts().then(
                function(contacts) {
                    vm.contacts = contacts;
                    console.log(vm.contacts);
                },
                function(error) {}
            );
        }

        activateAgain();

        vm.editPatient = function(patient) {
            patientFactory.editPatient(patient).then(
                function(success) {
                    console.log("success!");
                },
                function(error) {
                    console.log("error!");
                }
            );

        };

        vm.editContact = function(contact) {
            contactFactory.editContact(contact).then(
                function(success) {
                    console.log("success!");
                },
                function(error) {
                    console.log("error!");
                }
            );

        };

        vm.deleteContact = function(contact) {
            $ngBootbox.confirm('Are you sure you want to delete this contact?')
                .then(function() {
                    var index = vm.contacts.indexOf(contact);
                    contactFactory.deleteContact(contact).then(
                        function(success) {
                            vm.contacts.splice(index, 1);
                        },
                        function(error) {}
                    );
                    console.log('Confirmed!');
                }, function() {
                    console.log('Confirm dismissed!');
                });
        };

        vm.addContact = function() {
            vm.newContact = {
                "patientId": vm.currentPatientId,
                "firstName": vm.firstName,
                "lastName": vm.lastName,
                "email": vm.email,
                "telephone": vm.telephone
            };
            vm.saving = true;
            contactFactory.addContact(vm.newContact).then(
                function(theNewContact) {
                    vm.saving = false;
                    vm.contacts.push(theNewContact);
                },
                function() {}
            );
        };


    }

})();
