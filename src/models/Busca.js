"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Busca = void 0;
var Vertice_1 = require("./Vertice");
var Busca = /** @class */ (function () {
    function Busca(rotas) {
        this.rotas = rotas;
    }
    Busca.prototype.busca = function (origem, objetivo) {
        var atual = new Vertice_1.Vertice(origem, null);
        var fronteira = [atual];
        var visitados = new Set();
        visitados.add(atual.coordenada);
        var qtdVisitados = 1;
        var qtdExpandidos = 0;
        var resultado = null;
        while (fronteira.length > 0 && resultado === null) {
            var atual_1 = fronteira.shift();
            qtdExpandidos++;
            if (this.isPrateleira(atual_1.coordenada)) {
                if (atual_1.coordenada === objetivo) {
                    resultado = atual_1;
                    break;
                }
                else
                    continue;
            }
            var posicoes = this.rotas.rotas[atual_1.coordenada] || [];
            for (var _i = 0, posicoes_1 = posicoes; _i < posicoes_1.length; _i++) {
                var posicao = posicoes_1[_i];
                if (posicao === objetivo) {
                    qtdVisitados++;
                    var novo = new Vertice_1.Vertice(posicao, atual_1);
                    visitados.add(posicao);
                    resultado = novo;
                }
                else if (!visitados.has(posicao)) {
                    qtdVisitados++;
                    var novo = new Vertice_1.Vertice(posicao, atual_1);
                    fronteira.push(novo);
                    visitados.add(posicao);
                }
            }
        }
        return [resultado, qtdVisitados, qtdExpandidos];
    };
    Busca.prototype.isPrateleira = function (coordenada) {
        return !coordenada.includes('x');
    };
    Busca.prototype.mostraResultado = function (resultado, qtdVisitados, qtdExpandidos) {
        if (resultado === null) {
            console.log('Solução não encontrada.');
        }
        else {
            console.log('***Rota encontrada***');
            while (resultado !== null) {
                console.log(resultado.coordenada);
                resultado = resultado.pai;
            }
        }
        console.log('Vertices visitados: ', qtdVisitados);
        console.log('Vertices expandidos: ', qtdExpandidos);
    };
    return Busca;
}());
exports.Busca = Busca;
