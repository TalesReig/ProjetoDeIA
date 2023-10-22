import { Robo } from "./Robo";
import { Vertice } from "./Vertice";

export class Resultado {
    resultado: Vertice;
    qtdVisitados: Number;
    qtdExpandidos: Number;
    robo: Robo;
    
    constructor(resultado: Vertice, qtdVisitados: Number, qtdExpandidos: Number) {
      this.resultado = resultado;
      this.qtdVisitados = qtdVisitados;
      this.qtdExpandidos = qtdExpandidos;
    }
  }
  