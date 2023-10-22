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



// Adicione um evento de clique ao botão
// Função para lidar com o clique no botão "Calcular"
// Função para lidar com o clique no botão "Calcular"
function handleCalcularClick() {
    // Obtém os elementos dos selects
    const algoritmoElement = document.getElementById("algoritmo") as HTMLSelectElement | null;
    const prateleiraElement = document.getElementById("prateleira") as HTMLSelectElement | null;
  
    // Obtém os valores dos selects
    const algoritmo = algoritmoElement?.value || "";
    const prateleira = prateleiraElement?.value || "";
  
    // Verifica o valor do algoritmo
    if (algoritmo === "0") {
      // Executar a busca em largura
      // Substitua este comentário pela lógica da busca em largura
    } else if (algoritmo === "1") {
      // Executar a busca em profundidade
      // Substitua este comentário pela lógica da busca em profundidade
    } else if (algoritmo === "2") {
      // Executar a busca gulosa
      // Substitua este comentário pela lógica da busca gulosa
    } else {
      // Algoritmo não selecionado
      alert("Por favor, selecione um algoritmo válido (0, 1 ou 2).");
      return;
    }
  
    // Realiza as ações necessárias com os valores
    const resultado = `Algoritmo escolhido: ${algoritmo}, Prateleira escolhida: ${prateleira}`;
  
    // Exibe o resultado na caixa de texto
    const resultadoElement = document.getElementById("resultado") as HTMLTextAreaElement | null;
  
    if (resultadoElement) {
      resultadoElement.value = resultado;
    }
  }
  
  // Adiciona o evento de clique ao botão "Calcular"
  const calcularBtn = document.getElementById("calcularBtn");
  calcularBtn?.addEventListener("click", handleCalcularClick);
  