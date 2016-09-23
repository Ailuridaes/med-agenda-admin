(function() {
    'use strict';

    angular
        .module('app')
        .controller('DoctorDetailController', DoctorDetailController);

    DoctorDetailController.$inject = ['doctorFactory', 'assignmentFactory', 'medicalFieldsFactory', '$stateParams', 'specialtyFactory', '$q', '$ngBootbox', 'toastr'];

    /* @ngInject */
    function DoctorDetailController(doctorFactory, assignmentFactory, medicalFieldsFactory, $stateParams, specialtyFactory, $q, $ngBootbox, toastr) {
        var vm = this;
        vm.title = 'DoctorDetailController';

        // properties
        var specialty = [];
        var specialtyDelta = [];
        vm.assignment = {};
        vm.doctorSpecialties = [];
        vm.doctor = {};
        vm.medFields = {};
        vm.originalDoctor = {};

        // methods
        vm.updateDoctor = updateDoctor;

        activate();

        ////////////////

        function activate() {

            assignmentFactory.getByAssignmentId().then(
                function(assignment) {
                    vm.assignment = assignment;
                }
            );

            doctorFactory.getByDoctorId($stateParams.doctorId).then(
                function(doctor) {
                    vm.doctor = doctor;
                    vm.originalDoctor = angular.copy(doctor);
                }
            );

            medicalFieldsFactory.getAllMedFields().then(
                function(medFields) {
                    vm.medFields = medFields;
                    for (var i = 0; i < vm.doctor.specialties.length; i++) {
                        for (var m = 0; m < vm.medFields.length; m++) {
                            if (vm.medFields[m].medicalFieldId == vm.doctor.specialties[i].medicalFieldId) {
                                vm.doctorSpecialties.push(vm.medFields[m]);
                                break;
                            }
                        }
                    }
                }
            );
        }

        function updateDoctor(doctor) {
            if (_.isEqual(doctor, vm.originalDoctor) === false && (_.differenceBy(vm.doctorSpecialties, vm.originalDoctor.specialties, 'medicalFieldId')).length === 0 && (_.differenceBy(vm.originalDoctor.specialties, vm.doctorSpecialties, 'medicalFieldId')).length === 0) {
                if (vm.doctor.isDisabled != vm.originalDoctor.isDisabled) {
                    if (vm.doctor.isDisabled === true) {
                        var status = 'activate';
                    } else if (vm.doctor.isDisabled === false) {
                        var status = 'disactivate';
                    }
                    $ngBootbox.confirm('Are you sure you want to ' + status + ' this doctor?')
                        .then(function() {
                            doctorFactory.updateDoctor(doctor).then(
                                function()
                                {
                                     toastr.success('Successfully added changes', 'Saved');
                                     vm.originalDoctor.isDisabled = vm.doctor.isDisabled;
                                }
                            );
                        }, function() {
                            vm.doctor.isDisabled = vm.originalDoctor.isDisabled;
                        });
                } else if (vm.doctor.isDisabled === vm.originalDoctor.isDisabled) {
                    doctorFactory.updateDoctor(doctor).then(
                        function()
                        {
                             toastr.success('Successfully added changes', 'Saved');
                        }
                    );
                }
           } else if ((_.differenceBy(vm.doctorSpecialties, vm.originalDoctor.specialties, 'medicalFieldId')).length !== 0) {
                specialtyDelta = _.differenceBy(vm.doctorSpecialties, vm.originalDoctor.specialties, 'medicalFieldId');
                var promises = [];

                if (vm.doctor.isDisabled != vm.originalDoctor.isDisabled) {
                    if (vm.doctor.isDisabled === true) {
                        var status = 'activate';
                    } else if (vm.doctor.isDisabled === false) {
                        var status = 'disactivate';
                    }
                    $ngBootbox.confirm('Are you sure you want to ' + status + ' this doctor?')
                        .then(function() {
                            promises.push(doctorFactory.updateDoctor(doctor));

                            for (var i = 0; i < specialtyDelta.length; i++) {
                                specialty = {
                                    'doctorId': vm.originalDoctor.doctorId,
                                    'medicalFieldId': specialtyDelta[i].medicalFieldId
                                };

                                promises.push(specialtyFactory.addSpecialty(specialty));
                                vm.originalDoctor.isDisabled = vm.doctor.isDisabled;
                            }

                        }, function() {
                            vm.doctor.isDisabled = vm.originalDoctor.isDisabled;
                        });
                } else if (vm.doctor.isDisabled === vm.originalDoctor.isDisabled) {
                    promises.push(doctorFactory.updateDoctor(doctor));

                    for (var i = 0; i < specialtyDelta.length; i++) {
                        specialty = {
                            'doctorId': vm.originalDoctor.doctorId,
                            'medicalFieldId': specialtyDelta[i].medicalFieldId
                        };

                        promises.push(specialtyFactory.addSpecialty(specialty));
                    }
                };


                $q.all(promises).then(function(specialties) {
                    toastr.success('Successfully added changes', 'Saved');
                });
           } else if ((_.differenceBy(vm.originalDoctor.specialties, vm.doctorSpecialties, 'medicalFieldId')).length !== 0) {
                specialtyDelta = _.differenceBy(vm.originalDoctor.specialties, vm.doctorSpecialties, 'medicalFieldId');
                var promises = [];

                if (vm.doctor.isDisabled != vm.originalDoctor.isDisabled) {
                    if (vm.doctor.isDisabled === true) {
                        var status = 'activate';
                    } else if (vm.doctor.isDisabled === false) {
                        var status = 'disactivate';
                    }
                    $ngBootbox.confirm('Are you sure you want to ' + status + ' this doctor?')
                        .then(function() {
                            promises.push(doctorFactory.updateDoctor(doctor));

                            for (var i = 0; i < specialtyDelta.length; i++) {
                                specialty = {
                                    'doctorId': vm.originalDoctor.doctorId,
                                    'medicalFieldId': specialtyDelta[i].medicalFieldId
                                };

                                promises.push(specialtyFactory.removeSpecialty(specialty));
                                vm.originalDoctor.isDisabled = vm.doctor.isDisabled;
                            }

                        }, function() {
                            vm.doctor.isDisabled = vm.originalDoctor.isDisabled;
                        });
                } else if (vm.doctor.isDisabled === vm.originalDoctor.isDisabled) {
                    promises.push(doctorFactory.updateDoctor(doctor));

                    for (var i = 0; i < specialtyDelta.length; i++) {
                        specialty = {
                            'doctorId': vm.originalDoctor.doctorId,
                            'medicalFieldId': specialtyDelta[i].medicalFieldId
                        };

                        promises.push(specialtyFactory.removeSpecialty(specialty));
                    }
                };


                $q.all(promises).then(function(specialties) {
                    toastr.success('Successfully added changes', 'Saved');
                });

            }

        }
    }
})();
