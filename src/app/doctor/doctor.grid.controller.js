(function() {
    'use strict';

    angular
        .module('app')
        .controller('DoctorGridController', DoctorGridController);

    DoctorGridController.$inject = ['doctorFactory', 'doctorCheckInFactory', 'medicalFieldsFactory', 'specialtyFactory','$ngBootbox'];

    /* @ngInject */
    function DoctorGridController(doctorFactory, doctorCheckInFactory, medicalFieldsFactory, specialtyFactory, $ngBootbox) {
        var vm = this;
        vm.title = 'DoctorGridController';

        // properties
        vm.doctors = {};
        vm.doctorCheckIns = {};

        // methods
        vm.addDoctor = addDoctor;
        vm.updateDisableDoctor = updateDisableDoctor;

        activate();

        ////////////////
        function activate() {

            doctorFactory.getAllDoctors().then(
                function (doctors) {
                    vm.doctors = doctors;
                    doctorCheckInFactory.getAllDoctorCheckIns().then(
                        function (doctorCheckIns) {
                            vm.doctorCheckIns = doctorCheckIns;
                            for(var i = 0; i < doctors.length; i++)
                            {
                              for(var d = 0; d < doctorCheckIns.length; d++)
                              {
                                if (doctors[i].doctorId == doctorCheckIns[d].doctorId)
                                {
                                  doctors[i].checkIn = true;
                                  break;
                                }
                                doctors[i].checkIn = false;
                              }
                            }
                        }
                    );
                }
            );

            medicalFieldsFactory.getAllMedFields().then(
                function (medFields) {
                    vm.medFields = medFields;
                }
            );
        }

        function addDoctor(doctor) {
            doctorFactory.addDoctor(doctor).then(
                function(newDoctor){
                    $('#addDoctorModal').modal('hide');
                    for(var i = 0; i < vm.specialty.length; i++)
                    {
                        var specialty.push({  'doctorId' : newDoctor.doctorId,
                                              'medicalFieldId' : vm.specialty[i].medicalFieldId
                                          });
                    }
                    specialtyFactory.addSpecialty(specialty).then(
                        function(newSpecialty){
                            newDoctor.checkIn = false;
                            newDoctor.specialties = newSpecialty;

                        }
                    );
                    vm.doctors.push(newDoctor);
                    vm.doctor.firstName = null;
                    vm.doctor.lastName = null;
                    vm.doctor.email = null;
                    vm.doctor.telephone = null;
                }
            );
        }

        function updateDisableDoctor(doctor) {
            doctorFactory.updateDoctor(doctor).then(
                function(){}
            );
        }
    }
})();
