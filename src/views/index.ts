
import BuscaLargura from "../algoritimos-de-busca/BuscaLargura";
import BuscaProfundidade from "../algoritimos-de-busca/BuscaProfundidade";
import { Rotas } from "../models/Rotas";

const algbuscaLargura = new BuscaLargura(rotas);
algbuscaLargura.realizaBusca('0x0', '5x0');

const algbuscaProfundidade = new BuscaProfundidade(rotas);
algbuscaProfundidade.realizaBusca('0x0', '5x0');


/////////////////////////////////////////////////////////////////////////

// class BuscaHeuristica {
//   private rotas : Record<string, string[]> = {
//     '0x0': ['1x0', '1'],
//     '1x0': ['0x0', '1x1', '2x0'],
//     '2x0': ['1x0', '11', '3x0'],
//     '3x0': ['2x0', '21', '4x0'],
//     '4x0': ['3x0', '4x1', '5x0'],
//     '5x0': ['4x0', '31', '6x0'],
//     '6x0': ['5x0', '41', '7x0'],
//     '7x0': ['6x0', '7x1', '8x0'],
//     '8x0': ['7x0', '51', '8x0'],
//     '9x0': ['8x0', '61', '9x0'],
//     '10x0': ['9x0', '10x1', '10x0'],
//     '11x0': ['10x0', '71', '11x0'],
//     '12x0': ['11x0', '81', '12x0'],
//     '13x0': ['12x0', '13x1', '13x0'],
//     '15x0': ['14x0', '91'],
//     '1x1': ['1', '1x2', '11', '1x0'],
//     '4x1': ['21', '4x2', '31', '4x0'],
//     '7x1': ['41', '7x2', '51', '7x0'],
//     '10x1': ['61', '10x2', '71', '10x0'],
//     '13x1': ['81', '13x2', '91', '13x0'],
//     '1x2': ['2', '1x3', '12', '1x1'],
//     '4x2': ['22', '4x3', '32', '4x1'],
//     '7x2': ['42', '7x3', '52', '7x1'],
//     '10x2': ['62', '10x3', '72', '10x1'],
//     '13x2': ['82', '13x3', '92', '13x1'],
//     '1x3': ['3', '1x4', '13', '1x2'],
//     '4x3': ['23', '4x4', '33', '4x2'],
//     '7x3': ['43', '7x4', '53', '7x2'],
//     '10x3': ['63', '10x4', '73', '10x2'],
//     '13x3': ['83', '13x4', '93', '13x2'],
//   };

//   private dicPrateleiraParaCoordenada: Record<string, string> = {};

//   inicializaDic() {
//     for (let i = 1; i <= 100; i++) {
//         let x;

//         if (i >= 1 && i <= 10) {
//             x = '0x' + i;
//         } else if (i >= 11 && i <= 20) {
//             x = '2x' + (i - 10);
//         } else if (i >= 21 && i <= 30) {
//             x = '3x' + (i - 20);
//         } else if (i >= 31 && i <= 40) {
//             x = '5x' + (i - 30);
//         } else if (i >= 41 && i <= 50) {
//             x = '6x' + (i - 40);
//         } else if (i >= 51 && i <= 60) {
//             x = '8x' + (i - 50);
//         } else if (i >= 61 && i <= 70) {
//             x = '9x' + (i - 60);
//         } else if (i >= 71 && i <= 80) {
//             x = '11x' + (i - 70);
//         } else if (i >= 81 && i <= 90) {
//             x = '12x' + (i - 80);
//         } else if (i >= 91 && i <= 100) {
//             x = '14x' + (i - 90);
//         }

//         this.dicPrateleiraParaCoordenada[i.toString()] = x as string;
//       }
//   }    

//   constructor() {
//     this.inicializaDic();
// }


// realizaBusca(origem: string, destino: string): void {
//   const fronteira: vertice1[] = [];
//   const { resultado, qtdVisitados, qtdExpandidos } = this.busca(origem, destino, fronteira);
//   this.mostraResultado(resultado, qtdVisitados, qtdExpandidos);
// }
// calculaDistancia(origem: string, destino: string){
//   let coordenadaDestino = this.dicPrateleiraParaCoordenada[destino];

//   const [xOrigem, yOrigem] = origem.split('x').map(Number);
//   const [xDestino, yDestino] = coordenadaDestino.split('x').map(Number);

//   const catetoX = Math.abs(xDestino - xOrigem);
//   const catetoY = Math.abs(yDestino - yOrigem);

//   const distancia = Math.sqrt(catetoX ** 2 + catetoY ** 2);
  
//   return distancia;
// }

// private busca(origem: string, destino: string, fronteira: vertice1[]): { resultado: vertice1 | null, qtdVisitados: number, qtdExpandidos: number } {
//   const distancia = this.calculaDistancia(origem, destino);
//   let hn = distancia;

//   var atual = new vertice1(origem, null, 0, hn);
//   fronteira.push(atual);
//   let qtdVisitados = 1;
//   let qtdExpandidos = 0;

//   let resultado: vertice1 | null = null;
//   while (fronteira.length !== 0) {
//     fronteira.sort((a, b) => a.fn - b.fn);
//     atual = fronteira.shift()!;
//     if (atual.coordenada === destino) {
//       resultado = atual;
//       break;
//     }
//     if(!this.ehPrateleira(atual.coordenada)){
//       qtdExpandidos += 1;
//       const { newFronteira, newQtdVisitados } = this.geraFilhos(atual, destino, fronteira, qtdVisitados);
//       fronteira = newFronteira;
//       qtdVisitados = newQtdVisitados;
//     }
//   }

//   return { resultado, qtdVisitados, qtdExpandidos };
// }

// ehPrateleira(coordenada: string): boolean {
//   return !coordenada.includes('x');
// }

// private ehAncestral(cidade: string, nodo: vertice1 | null): boolean {
//   while (nodo !== null) {
//     if (cidade === nodo.coordenada) {
//       return true;
//     }
//     nodo = nodo.pai;
//   }
//   return false;
// }

// private geraFilhos(atual: vertice1, destino: string, fronteira: vertice1[], qtdVisitados: number): { newFronteira: vertice1[], newQtdVisitados: number } {
//   const rotas = this.rotas[atual.coordenada];
//   for (const r of rotas) {
//     if (atual.pai === null || !this.ehAncestral(r, atual.pai)) {
//       qtdVisitados += 1;

//       if(this.ehPrateleira(r)){
//         if( r === destino){
//           const novoPrateleira = new vertice1(r, atual, atual.gn, 0);
//           fronteira.push(novoPrateleira);
//         }
//       } else{
       
//         const distancia = this.calculaDistancia(r, destino);      
//         let hn = distancia;

//         const novo = new vertice1(r, atual, atual.gn + distancia, hn);
//         fronteira.push(novo);
//       }
//     }
//   }
//   return { newFronteira: fronteira, newQtdVisitados: qtdVisitados };
// }

// private mostraResultado(resultado: vertice1 | null, qtdVisitados: number, qtdExpandidos: number): void {
//   if (resultado === null) {
//     console.log('Solução não encontrada.');
//   } else {
//     console.log('***Rota encontrada***');
//     const caminho: string[] = [];
//     while (resultado !== null) {
//       caminho.push(resultado.coordenada + ' - ' + resultado.gn);
//       resultado = resultado.pai;
//     }
//     caminho.reverse();
//     for (const estado of caminho) {
//       console.log(estado);
//     }
//   }
//   console.log('Estados visitados: ', qtdVisitados);
//   console.log('Estados expandidos: ', qtdExpandidos);
// }
// }

// class vertice1 {
// constructor(public coordenada: string, public pai: vertice1 | null, public gn: number, public hn: number) { }

// get fn(): number {
//   return this.hn;
// }
// }

// // Exemplo de uso
// var algbusca = new BuscaHeuristica()
// algbusca.realizaBusca('0x0', '2');
