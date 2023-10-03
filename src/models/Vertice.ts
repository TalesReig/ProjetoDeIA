export class Vertice {
  coordenada: string;
  pai: Vertice | null;

  constructor(coordenada: string, pai: Vertice | null) {
    this.coordenada = coordenada;
    this.pai = pai;
  }
}