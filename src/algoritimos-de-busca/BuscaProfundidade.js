"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Busca_1 = require("../models/Busca");
var Vertice_1 = require("../models/Vertice");
var BuscaProfundidade = /** @class */ (function (_super) {
    __extends(BuscaProfundidade, _super);
    function BuscaProfundidade() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BuscaProfundidade.prototype.realizaBusca = function (origem, destino) {
        var _a = this.buscaProfundidade(origem, destino), resultado = _a[0], qtdVisitados = _a[1], qtdExpandidos = _a[2];
        this.mostraResultado(resultado, qtdVisitados, qtdExpandidos);
    };
    BuscaProfundidade.prototype.buscaProfundidade = function (origem, destino) {
        if (origem === destino)
            return [null, 0, 0];
        var atual = new Vertice_1.Vertice(origem, null);
        var fronteira = [atual];
        var visitados = new Set();
        var qtdVisitados = 1;
        var qtdExpandidos = 0;
        var resultado = null;
        while (fronteira.length >= 0 && resultado === null) {
            var atual_1 = fronteira.pop();
            qtdExpandidos++;
            visitados.add(atual_1.coordenada);
            var coordenadas = this.rotas.rotas[atual_1.coordenada];
            for (var _i = 0, coordenadas_1 = coordenadas; _i < coordenadas_1.length; _i++) {
                var coordenada = coordenadas_1[_i];
                if (coordenada === destino) {
                    qtdVisitados++;
                    var novo = new Vertice_1.Vertice(coordenada, atual_1);
                    visitados.add(coordenada);
                    resultado = novo;
                }
                else {
                    qtdVisitados++;
                    var novo = new Vertice_1.Vertice(coordenada, atual_1);
                    fronteira.push(novo);
                    visitados.add(coordenada);
                }
            }
        }
        return [resultado, qtdVisitados, qtdExpandidos];
    };
    return BuscaProfundidade;
}(Busca_1.Busca));
exports.default = BuscaProfundidade;
