import { Rotas } from "../models/Rotas";
import BuscaLargura from "../algoritimos-de-busca/BuscaLargura";
import BuscaProfundidade from "../algoritimos-de-busca/BuscaProfundidade";
import { BuscaGulosa } from "../algoritimos-de-busca/BuscaGulosa";
import { TiposDeBuscaEnum } from "../models/TiposDeBuscaEnum";
import { Robo } from "../models/Robo";
import { Resultado } from "../models/Resultado";

const robo1 = new Robo('0x12', "R1");
const robo2 = new Robo('1x12', "R2");
const robo3 = new Robo('2x12', "R3");
const robo4 = new Robo('3x12', "R4");
const robo5 = new Robo('4x12', "R5");

const rotas = new Rotas();

const algbuscaLargura = new BuscaLargura(rotas);
const algbuscaProfundidade = new BuscaProfundidade(rotas);
const algbuscaGulosa = new BuscaGulosa(rotas);

function handleCalcularClick() {
  const algoritmoElement = document.getElementById("algoritmo") as HTMLSelectElement | null;
  const prateleiraElement = document.getElementById("prateleira") as HTMLSelectElement | null;

  const algoritmo = algoritmoElement?.value || "";
  const prateleira = prateleiraElement?.value || "";


  var resultado = new Resultado([], 0, 0);

  if (algoritmo == "0") 
  {
    resultado = realizaBusca(algbuscaLargura, prateleira);
  } 
  else if (algoritmo == "1") 
  {
    resultado = realizaBusca(algbuscaProfundidade, prateleira);
  } 
  else if (algoritmo == "2") 
  {
    resultado = realizaBusca(algbuscaGulosa, prateleira);
  } 
  else 
  {
    alert("Por favor, selecione um algoritmo.");
    return;
  }  

  limparPosicaoAntiga(resultado.robo);

  resultado.robo.coordenada = resultado.caminho[resultado.caminho.length - 2]; 

  if(algoritmo == "2") resultado.robo.coordenada = resultado.robo.coordenada.split(' - ')[0];
    
  atualizaPosicaoRoboNoHTML(resultado.robo); 
  
  function mapearAlgoritmo(algoritmo: number): string {
    switch (algoritmo) {
      case TiposDeBuscaEnum.BuscaLargura:
        return 'Busca em Largura';
      case TiposDeBuscaEnum.BuscaProfundidade:
        return 'Busca em Profundidade';
      case TiposDeBuscaEnum.BuscaGulosa:
        return 'Busca Gulosa';
      default:
        return 'Algoritmo Desconhecido';
    }
  }
  
  const algoritmoTexto = mapearAlgoritmo(parseInt(algoritmo, 10));
  
  const caminho = resultado.caminho.join('\n');

  const caminhoComQuebras = '\n' + caminho;

  const resposta = `Algoritmo escolhido: ${algoritmoTexto}
  \nPrateleira escolhida: ${prateleira}
  \nRobo mais Próximo: ${resultado.robo.nome}
  \nCaminho: ${caminhoComQuebras}
  \nQuantidade de vertices visitados: ${resultado.qtdVisitados}
  \nQuantidade de vertices expandidos: ${resultado.qtdExpandidos}`;

  const respostaElement = document.getElementById("resposta") as HTMLTextAreaElement | null;

  if (respostaElement) respostaElement.value = resposta;  
}

function realizaBusca(algoritimo: any, prateleira: string) {
  var resultadoR1 = algoritimo.realizaBusca(robo1.coordenada, prateleira);
  var resultadoR2 = algoritimo.realizaBusca(robo2.coordenada, prateleira);
  var resultadoR3 = algoritimo.realizaBusca(robo3.coordenada, prateleira);
  var resultadoR4 = algoritimo.realizaBusca(robo4.coordenada, prateleira);
  var resultadoR5 = algoritimo.realizaBusca(robo5.coordenada, prateleira);

  atribuiRoboAoResultado(resultadoR1, resultadoR2, resultadoR3, resultadoR4, resultadoR5)
  
  return comparaResultado([resultadoR1, resultadoR2, resultadoR3, resultadoR4, resultadoR5]);
}

function atualizaPosicaoRoboNoHTML(roboEscolhido: Robo) {
    const tdElement = document.getElementById(roboEscolhido.coordenada);
    if (tdElement) {
      tdElement.textContent = roboEscolhido.nome;
    }
}

function limparPosicaoAntiga(roboEscolhido: Robo) {
  const tdElement = document.getElementById(roboEscolhido.coordenada);
  if (tdElement) {
    tdElement.textContent = "";
  }
}

function atribuiRoboAoResultado(resultadoR1: Resultado, resultadoR2: Resultado, resultadoR3: Resultado, resultadoR4: Resultado, resultadoR5: Resultado) {
  resultadoR1.robo = robo1;
  resultadoR2.robo = robo2;
  resultadoR3.robo = robo3;
  resultadoR4.robo = robo4;
  resultadoR5.robo = robo5;
}

function comparaResultado(valores: Resultado[]): Resultado {
  var resultado = valores[0];
  valores.forEach(r => {
    if (resultado.caminho.length > r.caminho.length) {
      resultado.caminho = r.caminho;
      resultado = r;
    }
  });
  
  return resultado;
}

const calcularBtn = document.getElementById("calcularBtn");

calcularBtn?.addEventListener("click", handleCalcularClick);

function definirValoresIniciais() {

  const id = (chave: string): chave is keyof typeof elementosTD => chave in elementosTD;

  const elementosTD = {
    '0x12': robo1.nome,
    '1x12': robo2.nome,
    '2x12': robo3.nome,
    '3x12': robo4.nome,
    '4x12': robo5.nome,
  };

  for (const chave in elementosTD) {
    if (id(chave)) { 
      const tdElement = document.getElementById(chave);
      if (tdElement) {
        tdElement.textContent = elementosTD[chave];
      }
    }
  }
}

window.addEventListener('load', definirValoresIniciais);
