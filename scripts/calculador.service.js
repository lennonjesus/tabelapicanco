(function () {
  'use strict';

  angular.module('tabelapicanco').factory('CalculadorService', calculadorService);

  function calculadorService($http) {
    'ngInject';

    var service = {
      calcular: calcular
    };

    return service;

    function calcular(parametros) {
      return $http.post('https://tabelapicanco.appspot.com/calc', parametros)
        .then(json => json.data);
    }

  }
})();
