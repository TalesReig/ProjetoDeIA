import { Busca } from "../models/Busca";
import { Resultado } from "../models/Resultado";
import { Vertice } from "../models/Vertice";

class BuscaLargura extends Busca {
  realizaBusca(origem: string, destino: string) {
    const [caminho, qtdVisitados, qtdExpandidos] = this.busca(origem, destino);
    // this.mostraResultado(resultado, qtdVisitados, qtdExpandidos);
    const resultado = new Resultado(caminho!, qtdVisitados, qtdExpandidos)
    return resultado;
  }
}

export default BuscaLargura;
