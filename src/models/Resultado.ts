import { Robo } from "./Robo";

export class Resultado {
    caminho: string;
    qtdVisitados: Number;
    qtdExpandidos: Number;
    robo: Robo;
    
    constructor(resultado: string, qtdVisitados: Number, qtdExpandidos: Number) {
      this.caminho = resultado;
      this.qtdVisitados = qtdVisitados;
      this.qtdExpandidos = qtdExpandidos;
    }
  }
  