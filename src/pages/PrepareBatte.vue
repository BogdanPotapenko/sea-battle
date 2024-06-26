<template>
  <div class="container">
    <div class="menu">
      <button-component @click="resetBoard" value="Reset" />
      <button-component @click="autoPlace" value="Auto" />
    </div>
    <board-component
      :board="board"
      prepare
      :selected="selectedShip !== null"
      @add="clickOnCell"
      @mouseenter="previewShip"
      @mouseleave="board.deletePreviewShip()"
    />
    <div class="ships">
      <div
        v-for="(ship, index) in ships.ships"
        :key="index"
        class="ship"
        :class="{
          selected: selectedShip === ship.id,
        }"
        :style="{ width: 25 * ship.type + 'px' }"
        @click="selectShip(ship.id)"
      ></div>
      <button-component
        v-if="!ships.ships.length"
        @click="startGame()"
        value="Start"
      />
    </div>
    <button-component
      class="turn"
      v-if="selectedShip && selectedShip > 3"
      @click="isRotate = !isRotate"
      value="turn"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import Board from "../utils/board";
import BattleShips from "../utils/ships";
import { useBoard } from "../utils/playerBoard";
import ButtonComponent from "../components/ButtonComponent.vue";
import BoardComponent from "../components/BoardComponent.vue";

const router = useRouter();

const board = ref(new Board());
const ships = ref(new BattleShips());

const playerBoard = useBoard;

const selectedShip = ref<number | null>(null);
const previewCellId = ref<number | null>(null);
const isRotate = ref(false);

const selectShip = (shipId: number) => {
  selectedShip.value = selectedShip.value === shipId ? null : shipId;
};

//add or remove a ship
const clickOnCell = (index: number) => {
  if (selectedShip.value !== null) {
    addShip(index);
  } else {
    removeShipFromBoard(index);
  }
};

//add the ship to the board
const addShip = (cellId: number) => {
  const ship = ships.value.ships.find((ship) => ship.id === selectedShip.value);
  if (selectedShip.value !== null && ship) {
    try {
      board.value.addShip(ship, cellId, isRotate.value);
    } catch (error: any) {
      return;
    }
    ships.value.removeShip(selectedShip.value);
    selectedShip.value = null;
  }
};

//remove the ship from the board
const removeShipFromBoard = (cellId: number) => {
  if (!selectedShip.value) {
    const cell = board.value.cells[cellId];
    const ship = cell.ship;
    if (ship) {
      board.value.removeShip(ship);
      ships.value.ships.push(ship);
    }
  }
};

const previewShip = (cellId: number) => {
  if (selectedShip.value !== null) {
    const ship = ships.value.ships.find(
      (ship) => ship.id === selectedShip.value
    );
    if (ship) {
      board.value.previewShip(ship, cellId, isRotate.value);
      previewCellId.value = cellId;
    }
  }
};

const resetBoard = () => {
  board.value = new Board();
  ships.value = new BattleShips();
};

// automatically add ships
const autoPlace = () => {
  selectedShip.value = null;
  resetBoard();
  board.value.autoShipPlace(ships.value.ships);
  ships.value.ships = [];
};

const startGame = () => {
  playerBoard.set(board.value.cells);
  router.push({ name: "battle" });
};

//turn the ship with the mouse wheel
window.onwheel = () => {
  isRotate.value = !isRotate.value;
  board.value.deletePreviewShip();
  if (previewCellId.value) previewShip(previewCellId.value);
};
</script>

<style scoped>
.menu {
  display: flex;
  margin: 0 auto;
  gap: 10px;
}
.ships {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 30px;
  gap: 10px;
}

.ship {
  height: 25px;
  background: var(--primary);
  border: solid 2px var(--secondary);
  border-radius: 5px;
  cursor: pointer;
}
.selected {
  border: solid 3px var(--hover);
}
.turn {
  margin: 0 auto;
}
</style>
