import { Busca } from "../models/Busca";

class BuscaLargura extends Busca {
  realizaBusca(origem: string, destino: string) {
    const [resultado, qtdVisitados, qtdExpandidos] = this.busca(origem, destino);
    this.mostraResultado(resultado, qtdVisitados, qtdExpandidos);
  }
}

export default BuscaLargura;
