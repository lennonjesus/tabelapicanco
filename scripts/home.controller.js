(function () {

  'use strict';

  angular.module('tabelapicanco').controller('HomeController', homeController);

  function homeController($http, FipeService) {

    /*jshint validthis:true */
    var vm = this;

    vm.init = init;
    vm.loadFabricantes = loadFabricantes;
    vm.loadModelos = loadModelos;
    vm.loadAnosModelo = loadAnosModelo;
    vm.loadDadosVeiculo = loadDadosVeiculo;
    vm.cancelar = cancelar;
    vm.calcularPi = calcularPi;

    vm.init();

    function init() {
      vm.loadFabricantes();

      vm.estadosPneus = [
        {value: 'novos', label: 'Novos', icon: 'thumb_up'},
        {value: 'meiavida', label: 'Meia vida', icon: 'thumbs_up_down'},
        {value: 'ruins', label: 'Ruins', icon: 'thumb_down'}
      ];

      vm.estadosConservacao = [
        {value: 'impecavel', label: 'Impecável', icon: 'sentiment_very_satisfied'},
        {value: 'riscos', label: 'Riscos', icon: 'sentiment_satisfied'},
        {value: 'quebras', label: 'Quebras', icon: 'sentiment_neutral'},
        {value: 'pessimo', label: 'Péssimo', icon: 'sentiment_very_dissatisfied'}
      ];

      vm.veiculo = {};
      vm.fabricantes = [];
      vm.modelos = [];
      vm.anosModelo = [];
      vm.veiculos = [];

      vm.ehUnicoDono = true;
      vm.passaVistoria = true;
      vm.ipvaQuitado = true;
      vm.temGarantia = false;
      vm.temMultas = false;
      vm.temAcessorios = false;
      vm.valorAcessorios = null;

      vm.selectedFabricanteId = null;
      vm.selectedModeloId = null;
      vm.selectedAnoModeloId = null;
      vm.selectedVeiculo = null;

      vm.kmAtual = null;

      vm.tabelaPicanco = null;
      vm.tabelaPicancoComAcessorios = null;

    }

    function loadFabricantes() {
      var promise = FipeService.loadFabricantes().then(data => {
        data.forEach(elm => {
          vm.fabricantes.push({
            id: elm.id,
            name: elm.name
          });
        });
      });

      return promise;
    }

    function loadModelos() {
      vm.modelos = [];

      var promise = FipeService.loadModelos(vm.selectedFabricanteId).then(data => {
        data.forEach(elm => {
          vm.modelos.push({
            id: elm.id,
            name: elm.name
          });
        });
      });

      return promise;
    }

    function loadAnosModelo() {
      vm.anosModelo = [];

      var promise = FipeService.loadAnosModelo(vm.selectedFabricanteId, vm.selectedModeloId).then(data => {
        data.forEach(elm => {
          vm.anosModelo.push({
            id: elm.id,
            name: elm.name
          });
        });
      });

      return promise;
    }

    function loadDadosVeiculo() {
      vm.selectedVeiculo = {};

      var promise = FipeService.loadDadosVeiculo(vm.selectedFabricanteId, vm.selectedModeloId, vm.selectedAnoModeloId).then(data => {
        vm.selectedVeiculo = data;
      });

      return promise;
    }

    function cancelar() {
      vm.init();
    }

    /* Private functions */

    function calcularPi() {


    }

    function plusPercent(val, percent) {
      return val + (val * percent) / 100;
    }

    function minPercent(val, percent) {
      return val - (val * percent) / 100;
    }
}
})();
