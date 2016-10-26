(function () {

  'use strict';

  angular.module('tabelapicanco').config(config);


  function config($mdAriaProvider) {
    'ngInject';
    // Globally disables all ARIA warnings.
    $mdAriaProvider.disableWarnings();
  }

})();
