
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


//criar uma classe robo com a cordenada 

// escolher a busca
// E calcular as 5 rotass 
// algbuscaLargura.realizaBusca(robo.vertice,  imput.value);
// Escolher o robo que tebe a menor rota e retornar para a caixa de texto 