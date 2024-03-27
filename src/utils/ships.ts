export default class BattleShips {
  ships: BattleShip[] = [];

  constructor() {
    this.ships = this.crateBattleShips();
  }

  private crateBattleShips() {
    const ships: BattleShip[] = [];
    const shipsTypes = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4];

    shipsTypes.forEach(function (element, idx) {
      ships.push(new BattleShip(element, idx, false));
    });

    return ships;
  }
  public removeShip(id: number) {
    const idx = this.ships.findIndex((ship) => ship.id === id);
    this.ships.splice(idx, 1);
  }
}

export class BattleShip {
  type: number;
  id: number;
  x: number | null = null;
  y: number | null = null;
  dead: boolean = false;

  constructor(type: number, id: number, dead: boolean) {
    this.type = type;
    this.id = id;
    this.dead = dead;
  }
}
