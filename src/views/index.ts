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


    var resposta =  new Resultado([], 0 ,0);

    if (algoritmo === "0") {
      resposta = realizaBuscaLargura(prateleira);
    
    } else if (algoritmo === "1") {
      resposta = realizaBuscaProfundidade(prateleira);
      
    } else if (algoritmo === "2") {
      resposta = realizaBuscaGulosa(prateleira);
     
    } else {
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
    var resultadoR5 = algbuscaLargura.realizaBusca(robo5.coordenada, prateleira);
    
    atribuiRoboAoResultado(resultadoR1, resultadoR2, resultadoR3, resultadoR4, resultadoR5)
    
    return comparaResultado([resultadoR1, resultadoR2, resultadoR3, resultadoR4, resultadoR5]);
}

function realizaBuscaProfundidade(prateleira: string) {
  var resultadoR1 = algbuscaProfundidade.realizaBusca(robo1.coordenada, prateleira);
  var resultadoR2 = algbuscaProfundidade.realizaBusca(robo2.coordenada, prateleira);
  var resultadoR3 = algbuscaProfundidade.realizaBusca(robo3.coordenada, prateleira);
  var resultadoR4 = algbuscaProfundidade.realizaBusca(robo4.coordenada, prateleira);
  var resultadoR5 = algbuscaProfundidade.realizaBusca(robo5.coordenada, prateleira);

  debugger
  atribuiRoboAoResultado(resultadoR1, resultadoR2, resultadoR3, resultadoR4, resultadoR5)
  
  return comparaResultado([resultadoR1, resultadoR2, resultadoR3, resultadoR4, resultadoR5]);
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

function realizaBuscaGulosa(prateleira: string) {
  var resultadoR1 = algbuscaGulosa.realizaBusca(robo1.coordenada, prateleira);
  var resultadoR2 = algbuscaGulosa.realizaBusca(robo2.coordenada, prateleira);
  var resultadoR3 = algbuscaGulosa.realizaBusca(robo3.coordenada, prateleira);
  var resultadoR4 = algbuscaGulosa.realizaBusca(robo4.coordenada, prateleira);
  var resultadoR5 = algbuscaGulosa.realizaBusca(robo5.coordenada, prateleira);

  atribuiRoboAoResultado(resultadoR1, resultadoR2, resultadoR3, resultadoR4, resultadoR5)
  
  return comparaResultado([resultadoR1, resultadoR2, resultadoR3, resultadoR4, resultadoR5]);
}

function atribuiRoboAoResultado(resultadoR1: Resultado, resultadoR2: Resultado, resultadoR3: Resultado, resultadoR4: Resultado, resultadoR5: Resultado) {
  resultadoR1.robo = robo1;
  resultadoR2.robo = robo2;
  resultadoR3.robo = robo3;
  resultadoR4.robo = robo4;
  resultadoR5.robo = robo5;
}



function comparaResultado(valores : Resultado[]) : Resultado{
   var menorQntVisitado = 9999;
   var resultado =  valores[0];
    valores.forEach(r => {
        if(resultado.caminho.length > r.caminho.length){
          resultado.caminho = r.caminho;
          resultado = r;
        }
   });

   return resultado;
    
}

  const calcularBtn = document.getElementById("calcularBtn");
  calcularBtn?.addEventListener("click", handleCalcularClick);
  

// import { Rotas } from "../models/Rotas";
// import BuscaLargura from "../algoritimos-de-busca/BuscaLargura";
// import BuscaProfundidade from "../algoritimos-de-busca/BuscaProfundidade";
// import { BuscaGulosa } from "../algoritimos-de-busca/BuscaGulosa";
// import { TiposDeBuscaEnum } from "../models/TiposDeBuscaEnum";
// import { Robo } from "../models/Robo";
// import { Resultado } from "../models/Resultado";

// const robo1 = new Robo('0x12', "Robo 1");
// const robo2 = new Robo('1x12', "Robo 2");
// const robo3 = new Robo('2x12', "Robo 3");
// const robo4 = new Robo('3x12', "Robo 4");

// const rotas = new Rotas();

// const algbuscaLargura = new BuscaLargura(rotas);
// const algbuscaProfundidade = new BuscaProfundidade(rotas);
// const algbuscaGulosa = new BuscaGulosa(rotas);

// algbuscaLargura.realizaBusca("0x12", "5");

//algbuscaProfundidade.realizaBusca("0x12", "10");
// algbuscaGulosa.realizaBusca("0x12", "5");

// function handleCalcularClick() {
//     const algoritmoElement = document.getElementById("algoritmo") as HTMLSelectElement | null;
//     const prateleiraElement = document.getElementById("prateleira") as HTMLSelectElement | null;
  
//     const algoritmo = algoritmoElement?.value || "";
//     const prateleira = prateleiraElement?.value || "";


//     var resposta =  new Resultado("", 0 ,0);

//     if (algoritmo === "0") {
//       resposta = realizaBuscaLargura(prateleira);
    
//     } else if (algoritmo === "1") {
//       resposta = realizaBuscaProfundidade(prateleira);
      
//     } else if (algoritmo === "2") {
//       resposta = realizaBuscaGulosa(prateleira);
     
//     } else {
//       Algoritmo não selecionado
//       alert("Por favor, selecione um algoritmo válido (0, 1 ou 2).");
//       return;
//     }
  

//     Realiza as ações necessárias com os valores
//     const resultado = `Algoritmo escolhido: ${TiposDeBuscaEnum[parseInt(algoritmo, 10)]}
//     \nPrateleira escolhida: ${prateleira}
//     \nRobo mais Próximo: ${resposta.robo.nome}
//     \nCaminho: ${resposta.caminho}
//     \nQuantidade vertices visitados: ${resposta.qtdVisitados}
//     \nQuantidade vertices expandidos: ${resposta.qtdExpandidos}`;

  
//     Exibe o resultado na caixa de texto
//     const resultadoElement = document.getElementById("resultado") as HTMLTextAreaElement | null;
  
//     if (resultadoElement) {
//       resultadoElement.value = resultado;
//     }
//   }
  
//   function realizaBuscaLargura(prateleira: string) {
//     var resultadoR1 = algbuscaLargura.realizaBusca(robo1.coordenada, prateleira);
//     var resultadoR2 = algbuscaLargura.realizaBusca(robo2.coordenada, prateleira);
//     var resultadoR3 = algbuscaLargura.realizaBusca(robo3.coordenada, prateleira);
//     var resultadoR4 = algbuscaLargura.realizaBusca(robo4.coordenada, prateleira);
    
//     atribuiRoboAoResultado(resultadoR1, resultadoR2, resultadoR3, resultadoR4)
    
//     return comparaResultado([resultadoR1, resultadoR2, resultadoR3, resultadoR4]);
// }

// function realizaBuscaProfundidade(prateleira: string) {
//   var resultadoR1 = algbuscaProfundidade.realizaBusca(robo1.coordenada, prateleira);
//   var resultadoR2 = algbuscaProfundidade.realizaBusca(robo2.coordenada, prateleira);
//   var resultadoR3 = algbuscaProfundidade.realizaBusca(robo3.coordenada, prateleira);
//   var resultadoR4 = algbuscaProfundidade.realizaBusca(robo4.coordenada, prateleira);

//   atribuiRoboAoResultado(resultadoR1, resultadoR2, resultadoR3, resultadoR4)
  
//   return comparaResultado([resultadoR1, resultadoR2, resultadoR3, resultadoR4]);
// }

// function realizaBuscaGulosa(prateleira: string) {
//   var resultadoR1 = algbuscaGulosa.realizaBusca(robo1.coordenada, prateleira);
//   var resultadoR2 = algbuscaGulosa.realizaBusca(robo2.coordenada, prateleira);
//   var resultadoR3 = algbuscaGulosa.realizaBusca(robo3.coordenada, prateleira);
//   var resultadoR4 = algbuscaGulosa.realizaBusca(robo4.coordenada, prateleira);

//   atribuiRoboAoResultado(resultadoR1, resultadoR2, resultadoR3, resultadoR4)
  
//   return comparaResultado([resultadoR1, resultadoR2, resultadoR3, resultadoR4]);
// }

// function atribuiRoboAoResultado(resultadoR1: Resultado, resultadoR2: Resultado, resultadoR3: Resultado, resultadoR4: Resultado) {

//   resultadoR1.robo = robo1;
//   resultadoR2.robo = robo2;
//   resultadoR3.robo = robo3;
//   resultadoR4.robo = robo4;

// }



// function comparaResultado(valores : Resultado[]) : Resultado{
//    var menorQntVisitado : Number = 999;
//    var resultado =  valores[0];
//     valores.forEach(r => {
//         if(menorQntVisitado > r.qtdVisitados){
//             menorQntVisitado = r.qtdVisitados;
//             resultado = r;
//         }
//    });

//    return resultado;
    
// }

//   const calcularBtn = document.getElementById("calcularBtn");
//   calcularBtn?.addEventListener("click", handleCalcularClick);
  