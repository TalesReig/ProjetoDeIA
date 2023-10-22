import { Resultado } from "../models/Resultado";
import { Rotas } from "../models/Rotas"; 

export class BuscaGulosa {
  rotas: Rotas; 

  constructor(rotas: Rotas) {
    this.rotas = rotas;
    this.inicializaDic();
  }

  private dicPrateleiraParaCoordenada: Record<string, string> = {};

  inicializaDic() {
    for (let i = 1; i <= 100; i++) {
        let x;

        if (i >= 1 && i <= 10) {
            x = '0x' + i;
        } else if (i >= 11 && i <= 20) {
            x = '2x' + (i - 10);
        } else if (i >= 21 && i <= 30) {
            x = '3x' + (i - 20);
        } else if (i >= 31 && i <= 40) {
            x = '5x' + (i - 30);
        } else if (i >= 41 && i <= 50) {
            x = '6x' + (i - 40);
        } else if (i >= 51 && i <= 60) {
            x = '8x' + (i - 50);
        } else if (i >= 61 && i <= 70) {
            x = '9x' + (i - 60);
        } else if (i >= 71 && i <= 80) {
            x = '11x' + (i - 70);
        } else if (i >= 81 && i <= 90) {
            x = '12x' + (i - 80);
        } else if (i >= 91 && i <= 100) {
            x = '14x' + (i - 90);
        }

        this.dicPrateleiraParaCoordenada[i.toString()] = x as string;
      }
  }    

  realizaBusca(origem: string, destino: string): Resultado {
    const fronteira: Vertice[] = [];
    const { resultado, qtdVisitados, qtdExpandidos } = this.busca(origem, destino, fronteira);
    var caminhoString = this.pegaCaminho(resultado, qtdVisitados, qtdExpandidos);
    const resultadoObjeto = new Resultado(caminhoString, qtdVisitados, qtdExpandidos)
    return resultadoObjeto;
  }

  calculaDistancia(origem: string, destino: string){
    let coordenadaDestino = this.dicPrateleiraParaCoordenada[destino];

    const [xOrigem, yOrigem] = origem.split('x').map(Number);
    const [xDestino, yDestino] = coordenadaDestino.split('x').map(Number);

    const catetoX = Math.abs(xDestino - xOrigem);
    const catetoY = Math.abs(yDestino - yOrigem);

    const distancia = Math.sqrt(catetoX ** 2 + catetoY ** 2);
    
    return distancia;
  }

  private busca(origem: string, destino: string, fronteira: Vertice[]): { resultado: Vertice | null, qtdVisitados: number, qtdExpandidos: number } {
    const distancia = this.calculaDistancia(origem, destino);
    let hn = distancia;

    var atual = new Vertice(origem, null, 0, hn);
    fronteira.push(atual);
    let qtdVisitados = 1;
    let qtdExpandidos = 0;

    let resultado: Vertice | null = null;
    while (fronteira.length !== 0) {
      fronteira.sort((a, b) => a.fn - b.fn);
      atual = fronteira.shift()!;
      if (atual.coordenada === destino) {
        resultado = atual;
        break;
      }
      if(!this.ehPrateleira(atual.coordenada)){
        qtdExpandidos += 1;
        const { newFronteira, newQtdVisitados } = this.geraFilhos(atual, destino, fronteira, qtdVisitados);
        fronteira = newFronteira;
        qtdVisitados = newQtdVisitados;
      }
    }

    return { resultado, qtdVisitados, qtdExpandidos };
  }

  ehPrateleira(coordenada: string): boolean {
    return !coordenada.includes('x');
  }

  private ehAncestral(cidade: string, nodo: Vertice | null): boolean {
    while (nodo !== null) {
      if (cidade === nodo.coordenada) {
        return true;
      }
      nodo = nodo.pai;
    }
    return false;
  }

  private geraFilhos(atual: Vertice, destino: string, fronteira: Vertice[], qtdVisitados: number): { newFronteira: Vertice[], newQtdVisitados: number } {
    const rotas = this.rotas.rotas[atual.coordenada];
    for (const r of rotas) {
      if (atual.pai === null || !this.ehAncestral(r, atual.pai)) {
        qtdVisitados += 1;

        if(this.ehPrateleira(r)){
          if( r === destino){
            const novoPrateleira = new Vertice(r, atual, atual.gn, 0);
            fronteira.push(novoPrateleira);
          }
        } else{
        
          const distancia = this.calculaDistancia(r, destino);      
          let hn = distancia;

          const novo = new Vertice(r, atual, atual.gn + distancia, hn);
          fronteira.push(novo);
        }
      }
    }
    return { newFronteira: fronteira, newQtdVisitados: qtdVisitados };
  }

  private pegaCaminho(resultado: Vertice | null, qtdVisitados: number, qtdExpandidos: number): string[] {
    const caminho: string[] = [];
    if (resultado === null) {
      console.log('Solução não encontrada.');
    } else {
      console.log('***Rota encontrada***');
      while (resultado !== null) {
        caminho.push(resultado.coordenada + ' - ' + resultado.gn);
        resultado = resultado.pai;
      }
      caminho.reverse();
      for (const estado of caminho) {
        console.log(estado);
      }
    }
    console.log('Estados visitados: ', qtdVisitados);
    console.log('Estados expandidos: ', qtdExpandidos);

    return caminho;
  }
}

  class Vertice {
  constructor(
    public coordenada: string, 
    public pai: Vertice | null, 
    public gn: number, 
    public hn: number) { }

  get fn(): number {
    return this.hn;
  }
}
