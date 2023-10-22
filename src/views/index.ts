import { Rotas } from "../models/Rotas";
import BuscaLargura from "../algoritimos-de-busca/BuscaLargura";
import BuscaProfundidade from "../algoritimos-de-busca/BuscaProfundidade";
import { BuscaGulosa } from "../algoritimos-de-busca/BuscaGulosa";
import { TiposDeBuscaEnum } from "../models/TiposDeBuscaEnum";


const rotas = new Rotas();

const algbuscaLargura = new BuscaLargura(rotas);
algbuscaLargura.realizaBusca('0x0', '5x0');

const algbuscaProfundidade = new BuscaProfundidade(rotas); 
algbuscaProfundidade.realizaBusca('0x0', '5x0');

const algbuscaGulosa = new BuscaGulosa(rotas);
algbuscaGulosa.realizaBusca('0x0', '2');


// Selecione o botão "Calcular" por seu ID
const calcularBtn = document.getElementById("calcularBtn");

// Adicione um evento de clique ao botão
calcularBtn?.addEventListener("click", () => {
  // Pegue os valores dos selects
  console.log("Botão de clique foi acionado.");

  const algoritmoElement: HTMLSelectElement | null = document.getElementById("algoritmo") as HTMLSelectElement | null;
  const prateleiraElement: HTMLSelectElement | null = document.getElementById("prateleira") as HTMLSelectElement | null;
  console.log("algoritmoElement = " + algoritmoElement);
  console.log("prateleiraElement = " + prateleiraElement);

  let algoritmo = "";
  let prateleira = "";
  if (algoritmoElement && prateleiraElement) {
    // Agora você pode acessar a propriedade 'value'
     algoritmo = algoritmoElement.value;
     prateleira = prateleiraElement.value;
  }

  // Realize as ações necessárias com os valores
  const resultado = `Algoritmo escolhido: ${algoritmo}, Prateleira escolhida: ${prateleira}`;

  // Exiba o resultado na caixa de texto
  const resultadoElement: HTMLTextAreaElement | null = document.getElementById("resultado") as HTMLTextAreaElement | null;

  if (resultadoElement) {
    // Agora você pode acessar a propriedade 'value'
    resultadoElement.value = resultado;
  }
});
