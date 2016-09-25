(function() {
    'use strict';

    angular
        .module('app')
        .factory('contactFactory', contactFactory);

    //injecting parameters to the factory
    contactFactory.$inject = ['$http', '$q', 'toastr', 'apiUrl'];

    function contactFactory($http, $q, toastr, apiUrl) {
        var service = {
            getContacts: getContacts,
            getContactById: getContactById,
            addContact: addContact,
            editContact: editContact,
            deleteContact: deleteContact
        };

        return service;

        function getContacts() {
            var deferred = $q.defer();

            //communicating with the api
            $http.get('http://localhost:61490/api/emergencycontacts').then(
                function(response) {
                    deferred.resolve(response.data);
                },
                function(err) {
                    toastr.error('Oh no! An error has occurred. Please try again.');
                    deferred.reject(err);
                }
            );

            //returns the array
            return deferred.promise;
        }

        function getContactById(id) {
            var deferred = $q.defer();

            //communicating with the api
            $http.get('http://localhost:61490/api/emergencycontacts/' + id).then(
                function(response) {
                    deferred.resolve(response.data);
                },
                function(err) {
                    toastr.error('Oh no! An error has occurred. Please try again.');
                    deferred.reject(err);
                }
            );

            //returns the array
            return deferred.promise;
        }

        function addContact(contact) {
            var deferred = $q.defer();

            //communicating with the api
            $http.post('http://localhost:61490/api/emergencycontacts/', contact).then(
                function(response) {
                    toastr.success('The contact was successfully added to the database.');
                    deferred.resolve(response.data);
                },
                function(err) {
                    toastr.error('Oh no! An error has occurred. Please try again.');
                    deferred.reject(err);
                }
            );

            //returns the array
            return deferred.promise;
        }


        function editContact(contact) {
            var deferred = $q.defer();

            //communicating with the api
            $http.put('http://localhost:61490/api/emergencycontacts/' + contact.emergencyContactID, contact).then(
                function(response) {
                    toastr.success("This contact's information has been successfully edited.");
                    deferred.resolve(response.data);
                },
                function(err) {
                    toastr.error('Oh no! An error has occurred. Please try again.');
                    deferred.reject(err);
                }
            );

            //returns the array
            return deferred.promise;
        }

        function deleteContact(contact) {
            var deferred = $q.defer();

            //communicating with the api
            $http.delete('http://localhost:61490/api/emergencycontacts' + '/' + contact.emergencyContactID).then(
                function(response) {
                    toastr.success('This contact was successfully removed from the database.');
                    deferred.resolve(response.data);
                },
                function(err) {
                    toastr.error('Oh no! An error has occurred. Please try again.');
                    deferred.reject(err);
                }
            );

            //returns the array
            return deferred.promise;
        }

    }
})();
