class Estado {
  cidade: string;
  pai: Estado | null;

  constructor(cidade: string, pai: Estado | null) {
    this.cidade = cidade;
    this.pai = pai;
  }
}

class Busca {
  rotas: { [key: string]: string[] };

  constructor() {
    this.rotas = {
      'Porto Alegre': ['Florianópolis', 'São Paulo'],
      'Florianópolis': ['Curitiba', 'Porto Alegre'],
      'Curitiba': ['Florianópolis', 'São Paulo', 'Rio de Janeiro'],
      'São Paulo': ['Belo Horizonte', 'Curitiba', 'Porto Alegre', 'Salvador'],
      'Rio de Janeiro': ['Belo Horizonte', 'Cuiabá', 'Curitiba'],
      'Belo Horizonte': ['Brasília', 'Cuiabá', 'São Paulo', 'Rio de Janeiro'],
      'Brasília': ['Belo Horizonte', 'Fortaleza'],
      'Salvador': ['Fortaleza', 'São Paulo'],
      'Cuiabá': ['Belo Horizonte', 'Manaus', 'Rio de Janeiro'],
      'Fortaleza': ['Manaus', 'Salvador', 'Brasília'],
      'Manaus': ['Cuiabá', 'Fortaleza']
    };
  }

  busca(origem: string, destino: string): [Estado | null, number, number] {
    const atual = new Estado(origem, null);
    const fronteira: Estado[] = [atual];
    const visitados: Set<string> = new Set();
    visitados.add(atual.cidade);
    let qtdVisitados = 1;
    let qtdExpandidos = 0;
    let resultado: Estado | null = null;

    while (fronteira.length > 0 && resultado === null) {
      const atual = fronteira.shift()!;
      qtdExpandidos++;
      const cidades = this.rotas[atual.cidade];

      for (const cidade of cidades) {
        if (cidade === destino) {
          qtdVisitados++;
          const novo = new Estado(cidade, atual);
          visitados.add(cidade);
          resultado = novo;
        } else if (!visitados.has(cidade)) {
          qtdVisitados++;
          const novo = new Estado(cidade, atual);
          fronteira.push(novo);
          visitados.add(cidade);
        }
      }
    }

    return [resultado, qtdVisitados, qtdExpandidos];
  }

  mostraResultado(resultado: Estado | null, qtdVisitados: number, qtdExpandidos: number) {
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

const algbusca = new BuscaLargura();
algbusca.realizaBusca('Porto Alegre', 'Manaus');
