"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rotas_1 = require("../models/Rotas");
var BuscaLargura_1 = require("../algoritimos-de-busca/BuscaLargura");
var BuscaProfundidade_1 = require("../algoritimos-de-busca/BuscaProfundidade");
var BuscaGulosa_1 = require("../algoritimos-de-busca/BuscaGulosa");
var rotas = new Rotas_1.Rotas();
var algbuscaLargura = new BuscaLargura_1.default(rotas);
algbuscaLargura.realizaBusca('0x0', '5x0');
var algbuscaProfundidade = new BuscaProfundidade_1.default(rotas);
algbuscaProfundidade.realizaBusca('0x0', '5x0');
var algbuscaGulosa = new BuscaGulosa_1.BuscaGulosa(rotas);
algbuscaGulosa.realizaBusca('0x0', '2');
// Selecione o botão "Calcular" por seu ID
var calcularBtn = document.getElementById("calcularBtn");
// Adicione um evento de clique ao botão
calcularBtn === null || calcularBtn === void 0 ? void 0 : calcularBtn.addEventListener("click", function () {
    // Pegue os valores dos selects
    var algoritmoElement = document.getElementById("algoritmo");
    var prateleiraElement = document.getElementById("prateleira");
    var algoritmo = "";
    var prateleira = "";
    if (algoritmoElement && prateleiraElement) {
        // Agora você pode acessar a propriedade 'value'
        algoritmo = algoritmoElement.value;
        prateleira = prateleiraElement.value;
    }
    // Realize as ações necessárias com os valores
    var resultado = "Algoritmo escolhido: ".concat(algoritmo, ", Prateleira escolhida: ").concat(prateleira);
    // Exiba o resultado na caixa de texto
    var resultadoElement = document.getElementById("resultado");
    if (resultadoElement) {
        // Agora você pode acessar a propriedade 'value'
        resultadoElement.value = resultado;
    }
});
