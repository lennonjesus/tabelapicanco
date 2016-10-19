(function () {

  'use strict';

  angular.module('tabelapicanco').factory('FipeService', fipeService);

  function fipeService($http) {

    const URL_API = 'https://fipeapi.appspot.com/api/1';

    var service = {
      loadFabricantes: loadFabricantes,
      loadAnosModelo: loadAnosModelo,
      loadDadosVeiculo: loadDadosVeiculo,
      loadModelos: loadModelos
    };

    return service;

    function loadFabricantes() {
      return $http.get(`${URL_API}/motos/marcas.json`)
        .then(json => json.data);
    }

    function loadModelos(selectedFabricanteId) {
      return $http.get(`${URL_API}/motos/veiculos/${selectedFabricanteId}.json`)
        .then(json => json.data);
    }

    function loadAnosModelo(selectedFabricanteId, selectedModeloId) {
      return $http.get(`${URL_API}/motos/veiculo/${selectedFabricanteId}/${selectedModeloId}.json`)
        .then(json => json.data);
    }

    function loadDadosVeiculo(selectedFabricanteId, selectedModeloId, selectedAnoModeloId) {
      return $http.get(`${URL_API}/motos/veiculo/${selectedFabricanteId}/${selectedModeloId}/${selectedAnoModeloId}.json`)
        .then(json => json.data);
    }

  }

})();
