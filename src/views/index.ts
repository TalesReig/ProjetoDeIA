class Vertice {
  coordenada: string;
  pai: Vertice | null;

  constructor(coordenada: string, pai: Vertice | null) {
    this.coordenada = coordenada;
    this.pai = pai;
  }
}

class Busca {
  rotas: { [key: string]: string[] };

  constructor() {
    this.rotas = {
      '0x0': ['1x0', '1'],
      '1x0': ['0x0', '1x1', '2x0'],
      '2x0': ['1x0', '11', '3x0'],
      '3x0': ['2x0', '21', '4x0'],
      '4x0': ['3x0', '4x1', '5x0'],
      '5x0': ['4x0', '31', '6x0'],
      '6x0': ['5x0', '41', '7x0'],
      '7x0': ['6x0', '7x1', '8x0'],
      '8x0': ['7x0', '51', '8x0'],
      '9x0': ['8x0', '61', '9x0'],
      '10x0': ['9x0', '10x1', '10x0'],
      '11x0': ['10x0', '71', '11x0'],
      '12x0': ['11x0', '81', '12x0'],
      '13x0': ['12x0', '13x1', '13x0'],
      '15x0': ['14x0', '91'],
      '1x1': ['1', '1x2', '11', '1x0'],
      '4x1': ['21', '4x2', '31', '4x0'],
      '7x1': ['41', '7x2', '51', '7x0'],
      '10x1': ['61', '10x2', '71', '10x0'],
      '13x1': ['81', '13x2', '91', '13x0'],
      '1x2': ['2', '1x3', '12', '1x1'],
      '4x2': ['22', '4x3', '32', '4x1'],
      '7x2': ['42', '7x3', '52', '7x1'],
      '10x2': ['62', '10x3', '72', '10x1'],
      '13x2': ['82', '13x3', '92', '13x1'],
      '1x3': ['3', '1x4', '13', '1x2'],
      '4x3': ['23', '4x4', '33', '4x2'],
      '7x3': ['43', '7x4', '53', '7x2'],
      '10x3': ['63', '10x4', '73', '10x2'],
      '13x3': ['83', '13x4', '93', '13x2'],
      '1x4': ['4', '1x5', '14', '1x3'],
      '4x4': ['24', '4x5', '34', '4x3'],
      '7x4': ['44', '7x5', '54', '7x3'],
      '10x4': ['64', '10x5', '74', '10x3'],
      '13x4': ['84', '13x5', '94', '13x3'],
      '1x5': ['5', '1x6', '15', '1x4'],
      '4x5': ['25', '4x6', '35', '4x4'],
      '7x5': ['45', '7x6', '55', '7x4'],
      '10x5': ['65', '10x6', '75', '10x4'],
      '13x5': ['82', '13x6', '95', '13x4'],
    };
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
  
      // Verifique se o nó atual é uma prateleira
      if (this.isPrateleira(atual.coordenada)) {
        // Se for uma prateleira e o objetivo, pare a busca
        if (atual.coordenada === objetivo) {
          resultado = atual;
          break;
        } else {
          // Se for uma prateleira e não o objetivo, ignore e continue
          continue;
        }
      }
  
      const posicoes = this.rotas[atual.coordenada] || [];
  
      for (const p of posicoes) {
        if (p === objetivo) {
          qtdVisitados++;
          const novo = new Vertice(p, atual);
          visitados.add(p);
          resultado = novo;
        } else if (!visitados.has(p)) {
          qtdVisitados++;
          const novo = new Vertice(p, atual);
          fronteira.push(novo);
          visitados.add(p);
        }
      }
    }
  
    return [resultado, qtdVisitados, qtdExpandidos];
  }
  
  // Função para verificar se uma coordenada é uma prateleira
  isPrateleira(coordenada: string): boolean {
    // Verifique se a coordenada é um número
    return !coordenada.includes('x');
  }
  

  mostraResultado(resultado: Vertice | null, qtdVisitados: number, qtdExpandidos: number) {
    if (resultado === null) {
      console.log('Solução não encontrada.');
    } else {
      console.log('***Rota encontrada***');
      while (resultado !== null) {
        console.log(resultado.coordenada);
        resultado = resultado.pai;
      }
    }
    console.log('Estados visitados: ', qtdVisitados);
    console.log('Estados expandidos: ', qtdExpandidos);
  }
}

class BuscaLargura extends Busca {
  realizaBusca(origem: string, destino: string) {
    const [resultado, qtdVisitados, qtdExpandidos] = this.busca(origem, destino);
    this.mostraResultado(resultado, qtdVisitados, qtdExpandidos);
  }
}

const algbusca = new BuscaLargura();
algbusca.realizaBusca('0x0', '12');


/////////////////////////////////////////////////////////////////////////

// class BuscaHeuristica {
//   private rotas: { [key: string]: [string, number][] } = {
//     'Porto Alegre': [['Florianópolis', 376], ['São Paulo', 852]],
//     'Florianópolis': [['Curitiba', 251], ['Porto Alegre', 376]],
//     'Curitiba': [['Florianópolis', 251], ['Rio de Janeiro', 676], ['São Paulo', 339]],
//     'São Paulo': [['Belo Horizonte', 490], ['Curitiba', 339], ['Porto Alegre', 852], ['Salvador', 1454]],
//     'Rio de Janeiro': [['Belo Horizonte', 340], ['Cuiabá', 1576], ['Curitiba', 676]],
//     'Belo Horizonte': [['Brasília', 600], ['Cuiabá', 1373], ['São Paulo', 490], ['Rio de Janeiro', 340]],
//     'Brasília': [['Belo Horizonte', 600], ['Fortaleza', 1600]],
//     'Salvador': [['Fortaleza', 1028], ['São Paulo', 1454]],
//     'Cuiabá': [['Belo Horizonte', 1373], ['Manaus', 1453], ['Rio de Janeiro', 1576]],
//     'Fortaleza': [['Manaus', 2384], ['Salvador', 1028], ['Brasília', 1600]],
//     'Manaus': [['Cuiabá', 1453], ['Fortaleza', 2384]]
//   };
  
  

//   private heuristicas: { [key: string]: [string, number][] } = {
//     'Porto Alegre': [['Porto Alegre', 0], ['Florianópolis', 376], ['Curitiba', 547], ['São Paulo', 852], ['Rio de Janeiro', 1124],
//       ['Belo Horizonte', 1341], ['Brasília', 1621], ['Cuiabá', 1679], ['Salvador', 2303], ['Fortaleza', 3241], ['Manaus', 3132]],
//     'Florianópolis': [['Porto Alegre', 376], ['Florianópolis', 0], ['Curitiba', 251], ['São Paulo', 489], ['Rio de Janeiro', 748],
//       ['Belo Horizonte', 973], ['Brasília', 1315], ['Cuiabá', 1544], ['Salvador', 1931], ['Fortaleza', 2858], ['Manaus', 2982]],
//     'Curitiba': [['Porto Alegre', 547], ['Florianópolis', 251], ['Curitiba', 0], ['São Paulo', 339], ['Rio de Janeiro', 676],
//       ['Belo Horizonte', 821], ['Brasília', 1081], ['Cuiabá', 1302], ['Salvador', 1784], ['Fortaleza', 2671], ['Manaus', 2734]],
//     'São Paulo': [['Porto Alegre', 852], ['Florianópolis', 489], ['Curitiba', 339], ['São Paulo', 0], ['Rio de Janeiro', 357],
//       ['Belo Horizonte', 490], ['Brasília', 873], ['Cuiabá', 1326], ['Salvador', 1454], ['Fortaleza', 2369], ['Manaus', 2598]],
//     'Rio de Janeiro': [['Porto Alegre', 1124], ['Florianópolis', 748], ['Curitiba', 676], ['São Paulo', 357], ['Rio de Janeiro', 0],
//       ['Belo Horizonte', 340], ['Brasília', 933], ['Cuiabá', 1576], ['Salvador', 1210], ['Fortaleza', 2190], ['Manaus', 2849]],
//     'Belo Horizonte': [['Porto Alegre', 1341], ['Florianópolis', 973], ['Curitiba', 821], ['São Paulo', 490], ['Rio de Janeiro', 340],
//       ['Belo Horizonte', 0], ['Brasília', 621], ['Cuiabá', 1373], ['Salvador', 964], ['Fortaleza', 1893], ['Manaus', 2446]],
//     'Brasília': [['Porto Alegre', 1621], ['Florianópolis', 1315], ['Curitiba', 1081], ['São Paulo', 873], ['Rio de Janeiro', 933],
//       ['Belo Horizonte', 621], ['Brasília', 0], ['Cuiabá', 880], ['Salvador', 1059], ['Fortaleza', 1688], ['Manaus', 1939]],
//     'Salvador': [['Porto Alegre', 2303], ['Florianópolis', 1931], ['Curitiba', 1784], ['São Paulo', 1454], ['Rio de Janeiro', 1210],
//       ['Belo Horizonte', 964], ['Brasília', 1059], ['Cuiabá', 1915], ['Salvador', 0], ['Fortaleza', 1028], ['Manaus', 2606]],
//     'Cuiabá': [['Porto Alegre', 1679], ['Florianópolis', 1544], ['Curitiba', 1302], ['São Paulo', 1326], ['Rio de Janeiro', 1576],
//       ['Belo Horizonte', 1373], ['Brasília', 880], ['Cuiabá', 0], ['Salvador', 1915], ['Fortaleza', 2329], ['Manaus', 1453]],
//     'Fortaleza': [['Porto Alegre', 3241], ['Florianópolis', 2858], ['Curitiba', 2671], ['São Paulo', 2369], ['Rio de Janeiro', 2190],
//       ['Belo Horizonte', 1893], ['Brasília', 1688], ['Cuiabá', 2329], ['Salvador', 1028], ['Fortaleza', 0], ['Manaus', 2384]],
//     'Manaus': [['Porto Alegre', 3132], ['Florianópolis', 2982], ['Curitiba', 2734], ['São Paulo', 2589], ['Rio de Janeiro', 2849],
//       ['Belo Horizonte', 2446], ['Brasília', 1939], ['Cuiabá', 1453], ['Salvador', 2606], ['Fortaleza', 2384], ['Manaus', 0]],
//   };
  

//   realizaBusca(origem: string, destino: string): void {
//     const fronteira: Estado1[] = [];
//     const { resultado, qtdVisitados, qtdExpandidos } = this.busca(origem, destino, fronteira);
//     this.mostraResultado(resultado, qtdVisitados, qtdExpandidos);
//   }

//   private busca(origem: string, destino: string, fronteira: Estado1[]): { resultado: Estado1 | null, qtdVisitados: number, qtdExpandidos: number } {
//     const distancias = this.heuristicas[origem];
//     let hn = 0;
//     for (const d of distancias) {
//       if (d[0] === destino) {
//         hn = d[1];
//         break;
//       }
//     }

//     var atual = new Estado1(origem, null, 0, hn);
//     fronteira.push(atual);
//     const visitados = new Set<string>();
//     visitados.add(atual.cidade);
//     let qtdVisitados = 1;
//     let qtdExpandidos = 0;

//     let resultado: Estado1 | null = null;
//     while (fronteira.length !== 0) {
//       fronteira.sort((a, b) => a.fn - b.fn);
//       atual = fronteira.shift()!;
//       if (atual.cidade === destino) {
//         resultado = atual;
//         break;
//       }
//       qtdExpandidos += 1;
//       const { newFronteira, newQtdVisitados } = this.geraFilhos(atual, destino, fronteira, qtdVisitados);
//       fronteira = newFronteira;
//       qtdVisitados = newQtdVisitados;
//     }

//     return { resultado, qtdVisitados, qtdExpandidos };
//   }

//   private ehAncestral(cidade: string, nodo: Estado1 | null): boolean {
//     while (nodo !== null) {
//       if (cidade === nodo.cidade) {
//         return true;
//       }
//       nodo = nodo.pai;
//     }
//     return false;
//   }

//   private geraFilhos(atual: Estado1, destino: string, fronteira: Estado1[], qtdVisitados: number): { newFronteira: Estado1[], newQtdVisitados: number } {
//     const cidades = this.rotas[atual.cidade];
//     for (const c of cidades) {
//       if (atual.pai === null || !this.ehAncestral(c[0], atual.pai)) {
//         qtdVisitados += 1;
//         const distancias = this.heuristicas[c[0]];
//         let hn = 0;
//         for (const d of distancias) {
//           if (d[0] === destino) {
//             hn = d[1];
//             break;
//           }
//         }
//         const novo = new Estado1(c[0], atual, atual.gn + c[1], hn);
//         fronteira.push(novo);
//       }
//     }
//     return { newFronteira: fronteira, newQtdVisitados: qtdVisitados };
//   }

//   private mostraResultado(resultado: Estado1 | null, qtdVisitados: number, qtdExpandidos: number): void {
//     if (resultado === null) {
//       console.log('Solução não encontrada.');
//     } else {
//       console.log('***Rota encontrada***');
//       const caminho: string[] = [];
//       while (resultado !== null) {
//         caminho.push(resultado.cidade + ' - ' + resultado.gn);
//         resultado = resultado.pai;
//       }
//       caminho.reverse();
//       for (const estado of caminho) {
//         console.log(estado);
//       }
//     }
//     console.log('Estados visitados: ', qtdVisitados);
//     console.log('Estados expandidos: ', qtdExpandidos);
//   }
// }

// class Estado1 {
//   constructor(public cidade: string, public pai: Estado1 | null, public gn: number, public hn: number) { }

//   get fn(): number {
//     return this.hn;
//   }
// }

// // Exemplo de uso
// var algbusca = new BuscaHeuristica()
// algbusca.realizaBusca('Florianópolis','Fortaleza')
