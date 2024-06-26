<template>
  <div class="table">
    <ul class="symbols">
      <li class="cell"></li>
      <li class="cell" v-for="(symbol, index) in symbols" :key="index">
        {{ symbol }}
      </li>
    </ul>
    <div>
      <ul class="numbers">
        <li class="cell" v-for="(number, index) in numbers" :key="index">
          {{ number }}
        </li>
      </ul>
      <div class="board">
        <div
          v-for="(cell, index) in board.cells"
          :key="index"
          class="cell"
          :class="{
            'has-ship': cell.ship && !enemy && !cell.isHitted,
            'not-free': !cell.isFree && !cell.ship && prepare,
            'attacked-ship': cell.isHitted,
            hover: enemy && !cell.isHitted && !cell.isMissed,
            preview: cell.isPreview,
            dead: cell.ship?.dead,
          }"
          :style="
            (!cell.isPreview && selected) || cell.isHitted || cell.isMissed
              ? { cursor: 'not-allowed' }
              : selected || (prepare && cell.ship) || (!prepare && enemy)
              ? { cursor: 'pointer' }
              : ''
          "
          @click="prepare ? $emit('add', index) : $emit('attack', cell)"
          @mouseenter.prevent="$emit('mouseenter', index)"
          @mouseleave.prevent="$emit('mouseleave')"
        >
          <div v-if="cell.isMissed" class="missed"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Board, { Cell } from "../utils/board";

const symbols = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

defineProps<{
  board: Board;
  enemy?: boolean;
  prepare?: boolean;
  selected?: boolean;
}>();

defineEmits<{
  (e: "attack", cell: Cell): void;
  (e: "add", index: number): void;
  (e: "mouseenter", index: number): void;
  (e: "mouseleave"): void;
}>();
</script>

<style scoped>
.table {
  display: flex;
  margin: 0 auto;
  height: 100%;
  width: fit-content;
  border: solid 1px var(--black);
}

.board {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
}

.numbers {
  display: flex;
}

.symbols > .cell,
.numbers > .cell {
  background-color: var(--light-grey);
}

.cell {
  background: var(--white);
  width: 25px;
  height: 25px;
  border: solid 1px var(--black);
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview {
  background: var(--primary);
  border: solid var(--primary);
}

.has-ship {
  background: var(--primary);
  border: solid 2px var(--secondary);
}

.not-free {
  background: var(--light-grey);
  border: solid 1px var(--grey);
}

.attacked-ship {
  background: var(--light-red);
  border: solid 2px var(--red);
}

.dead::after,
.dead::before {
  content: "";
  position: absolute;
  width: 2px;
  height: 25px;
  background: var(--red);
}

.dead::after {
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

.dead::before {
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}

.missed {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--secondary);
}
</style>
