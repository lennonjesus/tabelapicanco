(function () {

  'use strict';

  angular.module('tabelapicanco').controller('HomeController', homeController);

  function homeController($http) {

    const URL_API = 'https://fipeapi.appspot.com/api/1';

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

      vm.selectedFabricanteId = null;
      vm.selectedModeloId = null;
      vm.selectedAnoModeloId = null;

    }

    function loadFabricantes() {
      $http.get(URL_API + '/motos/marcas.json').then(json => {
        json.data.forEach(elm => {
          vm.fabricantes.push({
            id: elm.id,
            name: elm.name
          });
        });
      });
    }

    function loadModelos() {
      vm.modelos = [];

      return $http.get(URL_API + '/motos/veiculos/' + vm.selectedFabricanteId + '.json').then(json => {
        json.data.forEach(elm => {
          vm.modelos.push({
            id: elm.id,
            name: elm.name
          });
        });
      });
    }

    function loadAnosModelo() {
      vm.anosModelo = [];

      return $http.get(URL_API + '/motos/veiculo/' + vm.selectedFabricanteId + '/' + vm.selectedModeloId + '.json').then(json => {
        json.data.forEach(elm => {
          vm.anosModelo.push({
            id: elm.id,
            name: elm.name
          });
        });
      });
    }

    function loadDadosVeiculo() {
      vm.selectedVeiculo = {};

      $http.get(URL_API + '/motos/veiculo/' + vm.selectedFabricanteId + '/' + vm.selectedModeloId + '/' + vm.selectedAnoModeloId + '.json').then(json => {
        vm.selectedVeiculo = json.data;
      });
    }

    function cancelar() {
      vm.init();
    }

    /* Private functions */

    function calcularPi() {

        vm.tabelaPicanco = {};

        var inicioAno = moment().month() <= 3;

        var valorFipe = vm.selectedVeiculo.preco.substr(0, vm.selectedVeiculo.preco.indexOf(',')).replace("R$", "").replace(".", "").trim();

        var valor = minPercent(valorFipe, 25); // FIPE - 25%

        if (vm.kmAtual <= 10000) {
          valor = plusPercent(valor, 12); // veiculo zero
        }

        if (vm.kmAtual <= 20000 && vm.kmAtual > 10000) {
          valor = plusPercent(valor, 7); // veiculo novo
        }

        if (vm.kmAtual <= 35000 && vm.kmAtual > 20000) {
          valor = plusPercent(valor, 5); // veiculo semi novo
        }

        if (vm.kmAtual <= 60000 && vm.kmAtual > 35000) {
          valor = plusPercent(valor, 1); // veiculo usado
        }

        if (vm.kmAtual <= 100000 && vm.kmAtual > 60000) {
          valor = minPercent(valor, 1); // veiculo velho
        }

        if (vm.kmAtual > 100000) {
          valor = minPercent(valor, 5); // veiculo bem velho
        }

        if (vm.ehUnicoDono) {
          valor = plusPercent(valor, 3);
        }

        switch (vm.selectedEstadoConservacao) {
        case 'impecavel': {
          valor = plusPercent(valor, 3);
          break;
        }
        case 'riscos': {
          valor = plusPercent(valor, 1);
          break;
        }
        case 'quebras': {
          valor = minPercent(valor, 5);
          break;
        }
        case 'pessimo': {
          valor = minPercent(valor, 10);
          break;
        }
        default: {
          break;
        }
        }

        switch (vm.selectedEstadoPneus) {
        case 'novos': {
          valor = plusPercent(valor, 5);
          break;
        }
        case 'medianos': {
          valor = plusPercent(valor, 2);
          break;
        }
        case 'ruins': {
          vm.passaNaVistoria = false;
          break;
        }
        default: {
          break;
        }
        }

        if (vm.temGarantia) {
          valor = plusPercent(valor, 5);
        }

        if (vm.temMultas) {
          valor = minPercent(valor, 3);
        }

        if (!vm.passaNaVistoria) {
          valor = minPercent(valor, 3);
        }

        if (vm.ipvaQuitado && inicioAno) {
          valor = plusPercent(valor, 3);
        }

        if (!vm.ipvaQuitado) {
          valor = minPercent(valor, 3);
        }

        valor = Math.round(valor);

        vm.tabelaPicanco = {
          minimo: valor,
          anuncio: plusPercent(valor, 10),
          majorado: plusPercent(valor, 15)
        };

        if (vm.valorAcessorios) {
          var valorComAcessorios = Math.round(valor + minPercent(vm.valorAcessorios, 40));

          vm.tabelaPicanco.comAcessorios = {
            minimo: valorComAcessorios,
            anuncio: plusPercent(valorComAcessorios, 10),
            majorado: plusPercent(valorComAcessorios, 15)
          };
        }
    }

    function plusPercent(val, percent) {
      return val + (val * percent) / 100;
    }

    function minPercent(val, percent) {
      return val - (val * percent) / 100;
    }
}
})();
