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
  
  const matriz: any[][] = [
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [1, null, 11, 21, null, 31, 41, null, 51, 61, null, 71, 81, null, 91],
  ];

  const warehouse = new Warehouse(matriz);
  const queue: Robot[] = [robot];
  const visited: Set<string> = new Set();

  while (queue.length > 0) {
    debugger;
    const currentRobot = queue.shift() as Robot;
    const { coordinates, distanceTraveled } = currentRobot;
    const { positionX, positionY } = coordinates;
    visited.add(`${positionX}-${positionY}`);

    if (goals.some((goal) => goal.coordinates.positionX === positionX && goal.coordinates.positionY === positionY)) {
      // Encontrou um objetivo, retornar o caminho percorrido até ele
      return [];
    }

    // Movimentos possíveis: cima, baixo, esquerda, direita
    const moves: [number, number][] = [
      [-1, 0], // Cima
      [1, 0],  // Baixo
      [0, -1], // Esquerda
      [0, 1],  // Direita
    ];

    for (const [dx, dy] of moves) {
      const newRow = positionX + dx;
      const newCol = positionY + dy;
      const newPosition = `${newRow}-${newCol}`;

      if (
        newRow >= 0 &&
        newRow < warehouse.getRows() &&
        newCol >= 0 &&
        newCol < warehouse.getCols() &&
        !visited.has(newPosition) &&
        warehouse.isCellEmpty(newRow, newCol)
      ) {
        const newCoordinates = new Vertex(newRow, newCol);
        const newDistanceTraveled = distanceTraveled + 1;
        const newRobot = new Robot(newCoordinates, newDistanceTraveled);
        queue.push(newRobot);
      }
    }
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