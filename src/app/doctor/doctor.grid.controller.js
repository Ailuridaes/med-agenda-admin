(function() {
    'use strict';

    angular
        .module('app')
        .controller('DoctorGridController', DoctorGridController);

    DoctorGridController.$inject = ['doctorFactory', 'doctorCheckInFactory', 'medicalFieldsFactory', 'specialtyFactory','$ngBootbox', '$q', 'toastr'];

    /* @ngInject */
    function DoctorGridController(doctorFactory, doctorCheckInFactory, medicalFieldsFactory, specialtyFactory, $ngBootbox, $q, toastr) {
        var vm = this;
        vm.title = 'DoctorGridController';

        // properties
        var specialty = [];
        vm.doctors = {};
        vm.doctorCheckIns = {};

        // methods
        vm.addDoctor = addDoctor;

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

                    var promises = [];

                    for(var i = 0; i < vm.specialty.length; i++)
                    {
                        specialty = {
                          'doctorId' : newDoctor.doctorId,
                          'medicalFieldId' : vm.specialty[i].medicalFieldId
                        };

                        promises.push(specialtyFactory.addSpecialty(specialty));
                    }

                    $q.all(promises).then(function(specialties){
                      newDoctor.checkIn = false;
                      newDoctor.specialties = specialties;
                      vm.doctors.push(newDoctor);
                      toastr.success('Successfully added doctor', 'Saved');
                    });

                    vm.doctor.firstName = null;
                    vm.doctor.lastName = null;
                    vm.doctor.email = null;
                    vm.doctor.telephone = null;
                }
            );
        }
    }
})();
