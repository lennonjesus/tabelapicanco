(function () {
  'use strict';

  angular.module('tabelapicanco').factory('CalculadorService', calculadorService);

  function calculadorService() {

    const BRL = "R$";

    var service = {
      calcular: calcular
    }

    return service;

    function calcular() {
      tabelaPicanco = {};

      var inicioAno = moment().month() <= 3;

      var valorFipe = selectedVeiculo.preco.substr(0, selectedVeiculo.preco.indexOf(',')).replace(BRL, "").replace(".", "").trim();

      var valor = minPercent(valorFipe, 25); // FIPE - 25%

      if (kmAtual <= 10000) {
        valor = plusPercent(valor, 12); // veiculo zerinho
      }

      if (kmAtual <= 20000 && kmAtual > 10000) {
        valor = plusPercent(valor, 7); // veiculo novo
      }

      if (kmAtual <= 35000 && kmAtual > 20000) {
        valor = plusPercent(valor, 5); // veiculo semi novo
      }

      if (kmAtual <= 60000 && kmAtual > 35000) {
        valor = plusPercent(valor, 1); // veiculo usado
      }

      if (kmAtual <= 100000 && kmAtual > 60000) {
        valor = minPercent(valor, 1); // veiculo velho
      }

      if (kmAtual > 100000) {
        valor = minPercent(valor, 5); // veiculo bem velho
      }

      if (ehUnicoDono) {
        valor = plusPercent(valor, 3);
      }

      switch (selectedEstadoConservacao) {
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

      switch (selectedEstadoPneus) {
      case 'novos': {
        valor = plusPercent(valor, 5);
        break;
      }
      case 'medianos': {
        valor = plusPercent(valor, 2);
        break;
      }
      case 'ruins': {
        passaNaVistoria = false;
        break;
      }
      default: {
        break;
      }
      }

      if (temGarantia) {
        valor = plusPercent(valor, 5);
      }

      if (temMultas) {
        valor = minPercent(valor, 3);
      }

      if (!passaNaVistoria) {
        valor = minPercent(valor, 3);
      }

      if (ipvaQuitado && inicioAno) {
        valor = plusPercent(valor, 3);
      }

      if (!ipvaQuitado) {
        valor = minPercent(valor, 3);
      }

      valor = Math.round(valor);

      tabelaPicanco = {
        minimo: valor,
        anuncio: plusPercent(valor, 10),
        majorado: plusPercent(valor, 15)
      };

      if (valorAcessorios) {
        var valorComAcessorios = Math.round(valor + minPercent(valorAcessorios, 40));

        tabelaPicanco.comAcessorios = {
          minimo: valorComAcessorios,
          anuncio: plusPercent(valorComAcessorios, 10),
          majorado: plusPercent(valorComAcessorios, 15)
        };
      }
    }

  }
})();
