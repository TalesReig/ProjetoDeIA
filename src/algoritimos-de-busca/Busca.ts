import { Rotas } from "../models/Rotas";
import { Vertice } from "../models/Vertice";

export class Busca {
  rotas: Rotas; 

  constructor(rotas: Rotas) {
    this.rotas = rotas;
  }

  busca(origem: string, objetivo: string): [Vertice | null, number, number] {
    const atual = new Vertice(origem, null);
    const fronteira: Vertice[] = [atual];
    const visitados: Set<string> = new Set();
    visitados.add(atual.coordenada);
    let qtdVisitados = 1;
    let qtdExpandidos = 0;
    let resultado: Vertice | null = null;
  
    while (fronteira.length > 0 && resultado === null) {
      const atual = fronteira.shift()!;
      qtdExpandidos++;
  
      if (this.isPrateleira(atual.coordenada)) 
      {
        if (atual.coordenada === objetivo) 
        {
          resultado = atual;
          break;
        } 
        else 
          continue;
      }
  
      const posicoes = this.rotas.rotas[atual.coordenada] || [];
  
      for (const posicao of posicoes) {
        if (posicao === objetivo) {
          qtdVisitados++;
          const novo = new Vertice(posicao, atual);
          visitados.add(posicao);
          resultado = novo;
        } else if (!visitados.has(posicao)) {
          qtdVisitados++;
          const novo = new Vertice(posicao, atual);
          fronteira.push(novo);
          visitados.add(posicao);
        }
      }
    }
  
    return [resultado, qtdVisitados, qtdExpandidos];
  }
  
  isPrateleira(coordenada: string): boolean {
    return !coordenada.includes('x');
  }
  

  pegaCaminho(resultado: Vertice | null, qtdVisitados: number, qtdExpandidos: number): string[] {
    var caminho = [];
    if (resultado === null) {
      console.log('Solução não encontrada.');
    } else {
      console.log('***Rota encontrada***');

      while (resultado !== null) {
        console.log(resultado.coordenada);

        caminho.push(resultado.coordenada);

        resultado = resultado.pai;
      }
      caminho.reverse();
    }
    console.log('Vertices visitados: ', qtdVisitados);
    console.log('Vertices expandidos: ', qtdExpandidos);

    return caminho;
  }
}