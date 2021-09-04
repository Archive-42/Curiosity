
'use strict';

module.exports =
  angular
  .module('diDocuments.controllers', ['diDocuments.service', 'diBase.factories'])
  .controller('DeleteDialog', function($scope, $modalInstance, $rootScope, $timeout, documentsService, focus) {

  var item = $scope.item;

  $scope.ok = function() {
    // The version of angular bootstrap we are using
    // dosen't have the closed promise.
    // I could update angular bootstrap but I don't think
    // it's worth potentially introducing regression
    // for a small delete dialog.
    $timeout(function() {
      // WARNING: At this point the $scope was destried
      // by a previous call to $modalInstance.close().
      // Once again this could be avoided if we had
      // an up-to-date version of angular bootstrap.
      documentsService.removeItem(item);
      var next = documentsService.getItemByIndex(0);
      documentsService.setCurrentDocument(next);

      $rootScope.$emit('document.refresh');
    }, 500);

    return $modalInstance.close();
  };

  $scope.cancel = function() {
    return $modalInstance.dismiss('cancel');
  };

  // Set focus on the YES button to allow the user to
  // press enter or space to confirm deleting and to
  // visually highlight the YES button.
  $timeout(function() {
    focus('deleteModalYes');
  }, 100);

});
