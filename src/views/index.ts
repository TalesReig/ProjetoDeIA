import { Rotas } from "../models/Rotas";
import BuscaLargura from "../algoritimos-de-busca/BuscaLargura";
import BuscaProfundidade from "../algoritimos-de-busca/BuscaProfundidade";
import { BuscaGulosa } from "../algoritimos-de-busca/BuscaGulosa";
import { TiposDeBuscaEnum } from "../models/TiposDeBuscaEnum";
import { Robo } from "../models/Robo";
import { Resultado } from "../models/Resultado";
import { Vertice } from "../models/Vertice";

const robo1 = new Robo('0x12', "Robo 1");
const robo2 = new Robo('1x12', "Robo 2");
const robo3 = new Robo('2x12', "Robo 3");
const robo4 = new Robo('3x12', "Robo 4");

const rotas = new Rotas();

const algbuscaLargura = new BuscaLargura(rotas);
const algbuscaProfundidade = new BuscaProfundidade(rotas);
const algbuscaGulosa = new BuscaGulosa(rotas);



function handleCalcularClick() {
    const algoritmoElement = document.getElementById("algoritmo") as HTMLSelectElement | null;
    const prateleiraElement = document.getElementById("prateleira") as HTMLSelectElement | null;
  
    const algoritmo = algoritmoElement?.value || "";
    const prateleira = prateleiraElement?.value || "";


    var resposta =  new Resultado("", 0 ,0);

    if (algoritmo === "0") {
      resposta = realizaBuscaLargura(prateleira);
    
    } else if (algoritmo === "1") {
        algbuscaProfundidade.realizaBusca('0x0', '5x0');
      
    } else if (algoritmo === "2") {
        algbuscaGulosa.realizaBusca('0x0', '2');
     
    } else {
      // Algoritmo não selecionado
      alert("Por favor, selecione um algoritmo válido (0, 1 ou 2).");
      return;
    }
  

    // Realiza as ações necessárias com os valores
    const resultado = `Algoritmo escolhido: ${TiposDeBuscaEnum[parseInt(algoritmo, 10)]}
    \nPrateleira escolhida: ${prateleira}
    \nRobo mais Próximo: ${resposta.robo.nome}
    \nCaminho: ${resposta.caminho}
    \nQuantidade vertices visitados: ${resposta.qtdVisitados}
    \nQuantidade vertices expandidos: ${resposta.qtdExpandidos}`;

  
    // Exibe o resultado na caixa de texto
    const resultadoElement = document.getElementById("resultado") as HTMLTextAreaElement | null;
  
    if (resultadoElement) {
      resultadoElement.value = resultado;
    }
  }
  
  function realizaBuscaLargura(prateleira: string) {
    var resultadoR1 = algbuscaLargura.realizaBusca(robo1.coordenada, prateleira);
    var resultadoR2 = algbuscaLargura.realizaBusca(robo2.coordenada, prateleira);
    var resultadoR3 = algbuscaLargura.realizaBusca(robo3.coordenada, prateleira);
    var resultadoR4 = algbuscaLargura.realizaBusca(robo4.coordenada, prateleira);

    resultadoR1.robo = robo1;
    resultadoR2.robo = robo2;
    resultadoR3.robo = robo3;
    resultadoR4.robo = robo4;
    
    return comparaResultado([resultadoR1, resultadoR2, resultadoR3, resultadoR4]);
}

function comparaResultado(valores : Resultado[]) : Resultado{
   var menorQntVisitado : Number = 999;
   var resultado =  valores[0];
    valores.forEach(r => {
        if(menorQntVisitado > r.qtdVisitados){
            menorQntVisitado = r.qtdVisitados;
            resultado = r;
        }
   });

   return resultado;
    
}

  const calcularBtn = document.getElementById("calcularBtn");
  calcularBtn?.addEventListener("click", handleCalcularClick);
  