(function () {

  'use strict';

  angular.module('tabelapicanco').config(config);


  function config($mdAriaProvider, blockUIConfig) {
    'ngInject';

    // Globally disables all ARIA warnings.
    $mdAriaProvider.disableWarnings();

    // Disable automatic blockUI $http interceptor
    blockUIConfig.autoBlock = false;
  }

})();
