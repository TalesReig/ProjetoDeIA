import './styles.css';

class Vertex {
  constructor(public positionX: number, public positionY: number) {}
}

class Robot {
  constructor(public coordinates: Vertex, public distanceTraveled: number) {}
}

class Goal {
  constructor(public coordinates: Vertex) {}
}

class Warehouse {
  constructor(private matrix: (number | string)[][]) {}

  getRows(): number {
    return this.matrix.length;
  }

  getCols(): number {
    return this.matrix[0].length;
  }

  getElementAt(row: number, col: number): number | string {
    if (row < 0 || row >= this.getRows() || col < 0 || col >= this.getCols()) {
      throw new Error("Indices out of bounds of the matrix.");
    }
    return this.matrix[row][col];
  }

  isCellEmpty(row: number, col: number): boolean {
    const element = this.getElementAt(row, col);
    return element === " ";
  }

  isCellOccupied(row: number, col: number): boolean {
    const element = this.getElementAt(row, col);
    return typeof element === "number";
  }
}

function breadthFirstSearch(robot: Robot, goals: Goal[]): string[] | null {
  var Xinicial = robot.coordinates.positionX;
  var Yinicial = robot.coordinates.positionX;
  var qtdVisitados = 1;
  var qtdExpandidos = 0;
  const filhos: any[] = [];
  const visitados: any[] = [];

  const matriz: any[][] = [
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [1, null, 11, 21, null, 31, 41, null, 51, 61, null, 71, 81, null, 91],
  ];
  
  function gerarFilhos(){
   
  }

  function mostrarResultados(){

  }

  return ["Caminho não encontrado"];
}

// Exemplo de uso com a nova matriz:
function main(){
  console.log("teste");
  const initialCoordinates = new Vertex(1, 1);
  const robot = new Robot(initialCoordinates, 0);
  const goalCoordinates = new Vertex(12, 14); // Altere as coordenadas do objetivo conforme necessário
  const goal = new Goal(goalCoordinates);
  
  const result = breadthFirstSearch(robot, [goal]);
  
  if (result) {
    console.log("Caminho encontrado:");
    console.log(result.join(" -> "));
  } else {
    console.log("Caminho não encontrado.");
  }
}

window.addEventListener("load", () => main());