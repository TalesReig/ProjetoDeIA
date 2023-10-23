import { Busca } from "./Busca";
import { Resultado } from "../models/Resultado";
import { Vertice } from "../models/Vertice";

class BuscaProfundidade extends Busca {
  realizaBusca(origem: string, destino: string) {
    const [vertice, qtdVisitados, qtdExpandidos] = this.buscaProfundidade(origem, destino);
    var caminhoString = this.pegaCaminho(vertice, qtdVisitados, qtdExpandidos);
    const resultado = new Resultado(caminhoString, qtdVisitados, qtdExpandidos)
    return resultado;
  }

  buscaProfundidade(origem: string, destino: string): [Vertice | null, number, number] {
    if(origem === destino)
      return [null, 0, 0];
          
    const atual = new Vertice(origem, null);
    const fronteira: Vertice[] = [atual];
    const visitados: Set<string> = new Set();
    let qtdVisitados = 1;
    let qtdExpandidos = 0;
    let resultado: Vertice | null = null;

    while (fronteira.length > 0 && resultado === null) {
      const atual = fronteira.shift()!;
      qtdExpandidos++;
      visitados.add(atual.coordenada);

      if (this.rotas.rotas[atual.coordenada]) {
        const coordenadas = this.rotas.rotas[atual.coordenada];
        
        for (const coordenada of coordenadas) {
          if (coordenada === destino) {
            qtdVisitados++;
            const novo = new Vertice(coordenada, atual);
            visitados.add(coordenada);
            resultado = novo;
            break; 
          } else if (!visitados.has(coordenada)) {
            qtdVisitados++;
            const novo = new Vertice(coordenada, atual);
            fronteira.push(novo);
          } else {
            qtdVisitados++;
          }
        }
      }
    }

    return [resultado, qtdVisitados, qtdExpandidos];
  }
}

export default BuscaProfundidade;
