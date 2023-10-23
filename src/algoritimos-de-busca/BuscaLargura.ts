import { Busca } from "./Busca";
import { Resultado } from "../models/Resultado";

class BuscaLargura extends Busca {
  realizaBusca(origem: string, destino: string) {
    const [vertice, qtdVisitados, qtdExpandidos] = this.busca(origem, destino);
    var caminhoString = this.pegaCaminho(vertice, qtdVisitados, qtdExpandidos);
    const resultado = new Resultado(caminhoString, qtdVisitados, qtdExpandidos)
    return resultado;
  }
}

export default BuscaLargura;
