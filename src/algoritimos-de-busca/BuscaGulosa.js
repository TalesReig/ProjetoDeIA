"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuscaGulosa = void 0;
var BuscaGulosa = /** @class */ (function () {
    function BuscaGulosa(rotas) {
        this.dicPrateleiraParaCoordenada = {};
        this.rotas = rotas;
        this.inicializaDic();
    }
    BuscaGulosa.prototype.inicializaDic = function () {
        for (var i = 1; i <= 100; i++) {
            var x = void 0;
            if (i >= 1 && i <= 10) {
                x = '0x' + i;
            }
            else if (i >= 11 && i <= 20) {
                x = '2x' + (i - 10);
            }
            else if (i >= 21 && i <= 30) {
                x = '3x' + (i - 20);
            }
            else if (i >= 31 && i <= 40) {
                x = '5x' + (i - 30);
            }
            else if (i >= 41 && i <= 50) {
                x = '6x' + (i - 40);
            }
            else if (i >= 51 && i <= 60) {
                x = '8x' + (i - 50);
            }
            else if (i >= 61 && i <= 70) {
                x = '9x' + (i - 60);
            }
            else if (i >= 71 && i <= 80) {
                x = '11x' + (i - 70);
            }
            else if (i >= 81 && i <= 90) {
                x = '12x' + (i - 80);
            }
            else if (i >= 91 && i <= 100) {
                x = '14x' + (i - 90);
            }
            this.dicPrateleiraParaCoordenada[i.toString()] = x;
        }
    };
    BuscaGulosa.prototype.realizaBusca = function (origem, destino) {
        var fronteira = [];
        var _a = this.busca(origem, destino, fronteira), resultado = _a.resultado, qtdVisitados = _a.qtdVisitados, qtdExpandidos = _a.qtdExpandidos;
        this.mostraResultado(resultado, qtdVisitados, qtdExpandidos);
    };
    BuscaGulosa.prototype.calculaDistancia = function (origem, destino) {
        var coordenadaDestino = this.dicPrateleiraParaCoordenada[destino];
        var _a = origem.split('x').map(Number), xOrigem = _a[0], yOrigem = _a[1];
        var _b = coordenadaDestino.split('x').map(Number), xDestino = _b[0], yDestino = _b[1];
        var catetoX = Math.abs(xDestino - xOrigem);
        var catetoY = Math.abs(yDestino - yOrigem);
        var distancia = Math.sqrt(Math.pow(catetoX, 2) + Math.pow(catetoY, 2));
        return distancia;
    };
    BuscaGulosa.prototype.busca = function (origem, destino, fronteira) {
        var distancia = this.calculaDistancia(origem, destino);
        var hn = distancia;
        var atual = new Vertice(origem, null, 0, hn);
        fronteira.push(atual);
        var qtdVisitados = 1;
        var qtdExpandidos = 0;
        var resultado = null;
        while (fronteira.length !== 0) {
            fronteira.sort(function (a, b) { return a.fn - b.fn; });
            atual = fronteira.shift();
            if (atual.coordenada === destino) {
                resultado = atual;
                break;
            }
            if (!this.ehPrateleira(atual.coordenada)) {
                qtdExpandidos += 1;
                var _a = this.geraFilhos(atual, destino, fronteira, qtdVisitados), newFronteira = _a.newFronteira, newQtdVisitados = _a.newQtdVisitados;
                fronteira = newFronteira;
                qtdVisitados = newQtdVisitados;
            }
        }
        return { resultado: resultado, qtdVisitados: qtdVisitados, qtdExpandidos: qtdExpandidos };
    };
    BuscaGulosa.prototype.ehPrateleira = function (coordenada) {
        return !coordenada.includes('x');
    };
    BuscaGulosa.prototype.ehAncestral = function (cidade, nodo) {
        while (nodo !== null) {
            if (cidade === nodo.coordenada) {
                return true;
            }
            nodo = nodo.pai;
        }
        return false;
    };
    BuscaGulosa.prototype.geraFilhos = function (atual, destino, fronteira, qtdVisitados) {
        var rotas = this.rotas.rotas[atual.coordenada];
        for (var _i = 0, rotas_1 = rotas; _i < rotas_1.length; _i++) {
            var r = rotas_1[_i];
            if (atual.pai === null || !this.ehAncestral(r, atual.pai)) {
                qtdVisitados += 1;
                if (this.ehPrateleira(r)) {
                    if (r === destino) {
                        var novoPrateleira = new Vertice(r, atual, atual.gn, 0);
                        fronteira.push(novoPrateleira);
                    }
                }
                else {
                    var distancia = this.calculaDistancia(r, destino);
                    var hn = distancia;
                    var novo = new Vertice(r, atual, atual.gn + distancia, hn);
                    fronteira.push(novo);
                }
            }
        }
        return { newFronteira: fronteira, newQtdVisitados: qtdVisitados };
    };
    BuscaGulosa.prototype.mostraResultado = function (resultado, qtdVisitados, qtdExpandidos) {
        if (resultado === null) {
            console.log('Solução não encontrada.');
        }
        else {
            console.log('***Rota encontrada***');
            var caminho = [];
            while (resultado !== null) {
                caminho.push(resultado.coordenada + ' - ' + resultado.gn);
                resultado = resultado.pai;
            }
            caminho.reverse();
            for (var _i = 0, caminho_1 = caminho; _i < caminho_1.length; _i++) {
                var estado = caminho_1[_i];
                console.log(estado);
            }
        }
        console.log('Estados visitados: ', qtdVisitados);
        console.log('Estados expandidos: ', qtdExpandidos);
    };
    return BuscaGulosa;
}());
exports.BuscaGulosa = BuscaGulosa;
var Vertice = /** @class */ (function () {
    function Vertice(coordenada, pai, gn, hn) {
        this.coordenada = coordenada;
        this.pai = pai;
        this.gn = gn;
        this.hn = hn;
    }
    Object.defineProperty(Vertice.prototype, "fn", {
        get: function () {
            return this.hn;
        },
        enumerable: false,
        configurable: true
    });
    return Vertice;
}());
