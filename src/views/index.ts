class Estado {
  cidade: string;
  pai: Estado | null;

  constructor(cidade: string, pai: Estado | null) {
    this.cidade = cidade;
    this.pai = pai;
  }
}

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

  // constructor() {
  //   this.rotas = {
  //     'Porto Alegre': ['Florianópolis', 'São Paulo'],
  //     'Florianópolis': ['Curitiba', 'Porto Alegre'],
  //     'Curitiba': ['Florianópolis', 'São Paulo', 'Rio de Janeiro'],
  //     'São Paulo': ['Belo Horizonte', 'Curitiba', 'Porto Alegre', 'Salvador'],
  //     'Rio de Janeiro': ['Belo Horizonte', 'Cuiabá', 'Curitiba'],
  //     'Belo Horizonte': ['Brasília', 'Cuiabá', 'São Paulo', 'Rio de Janeiro'],
  //     'Brasília': ['Belo Horizonte', 'Fortaleza'],
  //     'Salvador': ['Fortaleza', 'São Paulo'],
  //     'Cuiabá': ['Belo Horizonte', 'Manaus', 'Rio de Janeiro'],
  //     'Fortaleza': ['Manaus', 'Salvador', 'Brasília'],
  //     'Manaus': ['Cuiabá', 'Fortaleza']
  //   };
  // }

  constructor() {
    this.rotas = {
      '0x0': ['1x0'],
      '1x0': ['0x0', '1x1', '2x0'],
      '2x0': ['1x0', '3x0'],
      '3x0': ['2x0', '4x0'],
      '4x0': ['3x0', '4x1', '5x0'],
      '5x0': ['4x0', '6x0'],
      '6x0': ['5x0', '7x0'],
      '7x0': ['6x0', '7x1', '8x0'],
      '8x0': ['7x0', '8x0'],
      '9x0': ['8x0', '9x0'],
      '10x0': ['9x0', '10x1', '10x0'],
      '11x0': ['10x0', '11x0'],
      '12x0': ['11x0', '12x0'],
      '13x0': ['12x0', '13x1', '13x0'],
      '14x0': ['13x0'],
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
      '13x5': ['85', '13x6', '95', '13x4'],
      '1x6': ['6', '1x7', '16', '1x5'],
      '4x6': ['26', '4x7', '36', '4x5'],
      '7x6': ['46', '7x7', '56', '7x5'],
      '10x6': ['66', '10x7', '76', '10x5'],
      '13x6': ['86', '13x7', '96', '13x5'],
      '1x7': ['7', '1x8', '17', '1x6'],
      '4x7': ['27', '4x8', '37', '4x6'],
      '7x7': ['47', '7x8', '57', '7x6'],
      '10x7': ['67', '10x8', '77', '10x6'],
      '13x7': ['87', '13x8', '97', '13x6'],
      '1x8': ['8', '1x9', '18', '1x7'],
      '4x8': ['28', '4x9', '38', '4x7'],
      '7x8': ['48', '7x9', '58', '7x7'],
      '10x8': ['68', '10x9', '78', '10x7'],
      '13x8': ['88', '13x9', '98', '13x7'],
      '1x9': ['9', '1x10', '19', '1x8'],
      '4x9': ['29', '4x10', '39', '4x8'],
      '7x9': ['49', '7x10', '59', '7x8'],
      '10x9': ['69', '10x10', '79', '10x8'],
      '13x9': ['89', '13x10', '99', '13x8 '],
      '1x10': ['10', '1x7', '20', '1x5'],
      '4x10': ['30', '4x7', '40', '4x5'],
      '7x10': ['50', '7x7', '60', '7x5'],
      '10x10': ['70', '10x7', '80', '10x5'],
      '13x10': ['90', '13x7', '100', '13x5'],
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

  mostraResultadoEstado(resultado: Estado | null, qtdVisitados: number, qtdExpandidos: number) {
    if (resultado === null) {
      console.log('Solução não encontrada.');
    } else {
      console.log('***Rota encontrada***');
      while (resultado !== null) {
        console.log(resultado.cidade);
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

class BuscaProfundidade extends Busca {
  realizaBusca(origem: string, destino: string) {
    const [resultado, qtdVisitados, qtdExpandidos] = this.buscaProfundidade(origem, destino);
    this.mostraResultadoEstado(resultado, qtdVisitados, qtdExpandidos);
  }

  buscaProfundidade(origem: string, destino: string): [Estado | null, number, number] {
    if(origem === destino)
      return [null, 0, 0];
    
    const atual = new Estado(origem, null);
    const fronteira: Estado[] = [atual];
    const visitados: Set<string> = new Set();
    let qtdVisitados = 1;
    let qtdExpandidos = 0;
    let resultado: Estado | null = null;

    while (fronteira.length >= 0 && resultado === null) {
      const atual = fronteira.pop()!; 
      qtdExpandidos = qtdExpandidos + 1 ; 
      visitados.add(atual.cidade); 

      const cidades = this.rotas[atual.cidade];

      for (const cidade of cidades) {
        if (cidade === destino) 
        {
          qtdVisitados = qtdVisitados + 1 ;
          const novo = new Estado(cidade, atual);
          visitados.add(cidade);
          resultado = novo;
        } 
        else 
        {
          qtdVisitados = qtdVisitados + 1 ;
          const novo = new Estado(cidade, atual);
          fronteira.push(novo);
          visitados.add(cidade);             
        }
      }      
    }

    return [resultado, qtdVisitados, qtdExpandidos];
  }
}

const algbuscaLargura = new BuscaLargura();
algbuscaLargura.realizaBusca('0x0', '5x0');

const algbuscaProfundidade = new BuscaProfundidade();
algbuscaProfundidade.realizaBusca('0x0', '5x0');

