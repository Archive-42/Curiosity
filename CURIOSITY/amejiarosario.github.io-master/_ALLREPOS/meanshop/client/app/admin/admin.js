'use strict';

angular.module('meanshopApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl',
        authenticate: 'admin'
      })

      .state('onlyAdmin', {
        url: '/admin-access',
        templateUrl: 'app/admin/only-admin.html'
      });
  });
