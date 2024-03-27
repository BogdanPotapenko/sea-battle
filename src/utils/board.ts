import { BattleShip } from "./ships";

export default class Board {
  cells: Cell[] = [];
  readonly boardSize = 100;

  constructor() {
    this.cells = this.createBoard();
  }

  createBoard() {
    const createdCells = [...Array(this.boardSize).map((_, i) => i++)];
    return createdCells.map(function (_cell, index) {
      return new Cell(index % 10, Math.floor(index / 10));
    });
  }

  previewShip(ship: BattleShip, cellId: number, isRotate: boolean) {
    const cell = this.cells[cellId];

    if (isRotate) {
      const verticalShip = this.getFilteredCells(cell, ship, "y");
      if (verticalShip.length) {
        verticalShip.forEach((cell) => (cell.isPreview = true));
      }
    } else {
      const horizontalShip = this.getFilteredCells(cell, ship, "x");
      if (horizontalShip.length) {
        horizontalShip.forEach((cell) => (cell.isPreview = true));
      }
    }
  }

  deletePreviewShip() {
    this.cells.forEach((el) => (el.isPreview = false));
  }

  addShip(ship: BattleShip, cellId: number, isRotate: boolean) {
    const cell = this.cells[cellId];

    if (isRotate) {
      const verticalShip = this.getFilteredCells(cell, ship, "y");
      if (verticalShip.length) {
        verticalShip.forEach((cell) => (cell.ship = ship));

        ship.x = cell.x;
        ship.y = cell.y;

        cell.ship = ship;
        this.getLockedCells([cell, ...verticalShip]).forEach((cell) =>
          cell !== undefined ? (cell.isFree = false) : null
        );
      } else {
        throw new Error();
      }
    } else {
      const horizontalShip = this.getFilteredCells(cell, ship, "x");
      if (horizontalShip.length) {
        horizontalShip.forEach((cell) => (cell.ship = ship));

        ship.x = cell.x;
        ship.y = cell.y;

        cell.ship = ship;
        this.getLockedCells([...horizontalShip]).forEach((cell) =>
          cell !== undefined ? (cell.isFree = false) : null
        );
      } else {
        throw new Error();
      }
    }
  }

  removeShip(ship: BattleShip) {
    const cells: Cell[] = [];

    this.cells.forEach((cell) => {
      if (cell.ship === ship) {
        cells.push(cell);
        cell.isPreview = false;
        return (cell.ship = null);
      }
    });
    const cellsWithShip = this.cells.filter((cell) => cell.ship);

    this.getLockedCells(cells).forEach((cell) =>
      cell !== undefined ? (cell.isFree = true) : null
    );
    this.getLockedCells(cellsWithShip).forEach((cell) =>
      cell !== undefined ? (cell.isFree = false) : null
    );
  }

  autoShipPlace(ships: BattleShip[]) {
    let length = ships.length;
    let i = 0;

    const placeShip = (ship: BattleShip) => {
      try {
        let randomCell = Math.floor(Math.random() * 100);
        let randomRotate = Boolean(Math.floor(Math.round(Math.random())));

        while (this.cells[randomCell].ship && !this.cells[randomCell].isFree) {
          randomCell = Math.floor(Math.random() * 100);
          randomRotate = Boolean(Math.floor(Math.round(Math.random())));
        }
        this.addShip(ship, randomCell, randomRotate);
      } catch (e) {
        placeShip(ship);
      }
    };

    while (length > 0) {
      try {
        placeShip(ships[i]);
        i++;
        length--;
      } catch (e) {
        placeShip(ships[i]);
      }
    }
  }

  attackShip(cellRef: Cell) {
    const cell = this.cells.find(
      (cell) => cell.x === cellRef.x && cell.y === cellRef.y
    );
    if (!cell) return;
    if (cell.ship && !cell.isMissed) {
      cell.isHitted = true;
    } else {
      cell.isMissed = true;
    }
    if (cell.ship) {
      const shipCells = this.cells.filter(
        (refCell) => refCell.ship?.id === cell.ship?.id
      );
      if (!shipCells.some((cell) => !cell.isHitted)) {
        const missedCells = this.getLockedCells(shipCells);
        missedCells.forEach((cell) => {
          if (!cell.ship) {
            return (cell.isMissed = true);
          }
        });
        if (cell.isHitted) {
          shipCells.forEach((ship) => {
            if (ship.ship) {
              ship.ship.dead = true;
            }
          });
        }
      }
    }
  }

  getLockedCells(shipCells: Cell[]) {
    const mustLock: Cell[] = [];
    shipCells.forEach((cell) => {
      const coordinates = [
        //top
        { x: cell.x - 1, y: cell.y - 1 },
        { x: cell.x, y: cell.y - 1 },
        { x: cell.x + 1, y: cell.y - 1 },
        //left-right
        { x: cell.x - 1, y: cell.y },
        { x: cell.x + 1, y: cell.y },
        //bottom
        { x: cell.x - 1, y: cell.y + 1 },
        { x: cell.x, y: cell.y + 1 },
        { x: cell.x + 1, y: cell.y + 1 },
      ];

      coordinates.forEach((_, i) => {
        const filteredCell = this.cells.find(function (item) {
          return item.x === coordinates[i].x && item.y === coordinates[i].y;
        });
        if (filteredCell) mustLock.push(filteredCell);
      });
    });

    return mustLock;
  }

  getFilteredCells(cell: Cell, ship: BattleShip, coordinate: "x" | "y") {
    let shipCoordinate = cell[coordinate];
    const reversedCoordinate = coordinate === "y" ? "x" : "y";

    const cells = this.cells.filter((filteredCell) => {
      if (filteredCell.ship || !filteredCell.isFree || !filteredCell) {
        return null;
      } else if (
        filteredCell[coordinate] === shipCoordinate &&
        filteredCell[reversedCoordinate] === cell[reversedCoordinate] &&
        filteredCell[coordinate] < cell[coordinate] + ship.type
      ) {
        shipCoordinate++;
        return filteredCell;
      }
    });
    if (cells.length < ship.type) return [];

    return cells;
  }
}

export class Cell {
  x: number;
  y: number;
  isFree = true;
  isPreview = false;
  isMissed = false;
  isHitted = false;
  ship: BattleShip | null = null;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
