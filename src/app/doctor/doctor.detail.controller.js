(function() {
    'use strict';

    angular
        .module('app')
        .controller('DoctorDetailController', DoctorDetailController);

    DoctorDetailController.$inject = ['doctorFactory', 'assignmentFactory', 'medicalFieldsFactory', '$stateParams', '$ngBootbox'];

    /* @ngInject */
    function DoctorDetailController(doctorFactory, assignmentFactory, medicalFieldsFactory, $stateParams, $ngBootbox) {
        var vm = this;
        vm.title = 'DoctorDetailController';

        // properties
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
        		function (assignment) {
        			vm.assignment = assignment;
        		}
        	);

        	doctorFactory.getByDoctorId($stateParams.doctorId).then(
        		function (doctor) {
        			vm.doctor = doctor;
                    vm.originalDoctor = angular.copy(doctor);
        		}
        	);

          medicalFieldsFactory.getAllMedFields().then(
              function (medFields) {
                  vm.medFields = medFields;
                  for(var i = 0; i < vm.doctor.specialties.length; i++)
                  {
                    for(var m = 0; m < vm.medFields.length; m++)
                    {
                      if(vm.medFields[m].medicalFieldId == vm.doctor.specialties[i].medicalFieldId)
                      {
                        vm.doctorSpecialties.push(vm.medFields[m]);
                        break;
                      }
                    }
                  }
              }
          );
        }

        function updateDoctor(doctor) {
             if(_.isEqual(doctor,vm.originalDoctor) === false && vm.doctor.isDisabled === vm.originalDoctor.isDisabled && vm.doctorSpecialties === vm.originalDoctor.specialties)
             {
                  doctorFactory.updateDoctor(doctor).then(
                      function(){}
                  );
             }
             else if(vm.doctorSpecialties != vm.originalDoctor.specialties)
             {
                  
                  function updateSpecialty(specialty) {  
                    specialtyFactory.update(specialty).then(
                      function(){}
                    );
                  }
                  console.log("true");
             }
             else if(vm.doctor.isDisabled != vm.originalDoctor.isDisabled)
             {
                  if(vm.doctor.isDisabled === true)
                  {
                       var status = 'activate';
                  }
                  else if(vm.doctor.isDisabled === false)
                  {
                       var status = 'disactivate';
                  }
                  $ngBootbox.confirm('Are you sure you want to ' + status + ' this doctor?')
                    .then(function(){
                         doctorFactory.updateDoctor(doctor).then(
                             function(){}
                         );
                    }, function(){
                         vm.doctor.isDisabled = vm.originalDoctor.isDisabled;
                    });
             }
          }
    }
})();
