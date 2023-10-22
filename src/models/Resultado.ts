import { Robo } from "./Robo";

export class Resultado {
    caminho: string[];
    qtdVisitados: Number;
    qtdExpandidos: Number;
    robo: Robo;
    
    constructor(caminho: string[], qtdVisitados: Number, qtdExpandidos: Number) {
      this.caminho = caminho;
      this.qtdVisitados = qtdVisitados;
      this.qtdExpandidos = qtdExpandidos;
    }
  }
  