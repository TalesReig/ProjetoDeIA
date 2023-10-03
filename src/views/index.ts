
import { Rotas } from "../models/Rotas";
import BuscaLargura from "../algoritimos-de-busca/BuscaLargura";
import BuscaProfundidade from "../algoritimos-de-busca/BuscaProfundidade";
import { BuscaHeuristica } from "../algoritimos-de-busca/BuscaHeuristica";

const rotas = new Rotas();

const algbuscaLargura = new BuscaLargura(rotas);
algbuscaLargura.realizaBusca('0x0', '5x0');

const algbuscaProfundidade = new BuscaProfundidade(rotas);
algbuscaProfundidade.realizaBusca('0x0', '5x0');

const algbuscaGulosa = new BuscaHeuristica(rotas);
algbuscaGulosa.realizaBusca('0x0', '2');