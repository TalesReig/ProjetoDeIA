import { Busca } from "../models/Busca";
import { Vertice } from "../models/Vertice";

class BuscaProfundidade extends Busca {
  realizaBusca(origem: string, destino: string) {
    const [resultado, qtdVisitados, qtdExpandidos] = this.buscaProfundidade(origem, destino);
    this.pegaCaminho(resultado, qtdVisitados, qtdExpandidos);
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

    while (fronteira.length >= 0 && resultado === null) {
      const atual = fronteira.pop()!; 
      qtdExpandidos++; 
      visitados.add(atual.coordenada); 

      const coordenadas = this.rotas.rotas[atual.coordenada];

      for (const coordenada of coordenadas) {
        if (coordenada === destino) 
        {
          qtdVisitados++;
          const novo = new Vertice(coordenada, atual);
          visitados.add(coordenada);
          resultado = novo;
        } 
        else 
        {
          qtdVisitados++;
          const novo = new Vertice(coordenada, atual);
          fronteira.push(novo);
          visitados.add(coordenada);             
        }
      }      
    }

    return [resultado, qtdVisitados, qtdExpandidos];
  }
}

export default BuscaProfundidade;
