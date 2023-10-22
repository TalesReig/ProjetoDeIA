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
var BuscaLargura = /** @class */ (function (_super) {
    __extends(BuscaLargura, _super);
    function BuscaLargura() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BuscaLargura.prototype.realizaBusca = function (origem, destino) {
        var _a = this.busca(origem, destino), resultado = _a[0], qtdVisitados = _a[1], qtdExpandidos = _a[2];
        this.mostraResultado(resultado, qtdVisitados, qtdExpandidos);
    };
    return BuscaLargura;
}(Busca_1.Busca));
exports.default = BuscaLargura;
