<template>
  <div v-if="theWinner">
    <winner-component :winner="theWinner" />
  </div>
  <div v-else class="container">
    <button-component @click="router.push('/')" value="Start over" />
    <div class="boards">
      <div class="board">
        <p>Player</p>
        <board-component :board="player" />
      </div>
      <div class="board">
        <p>Enemy</p>
        <board-component @attack="playerAttack" enemy :board="enemy" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onDeactivated, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import BattleShips from "../utils/ships";
import Board, { Cell } from "../utils/board";
import { useBoard } from "../utils/playerBoard";
import BoardComponent from "../components/BoardComponent.vue";
import ButtonComponent from "../components/ButtonComponent.vue";
import WinnerComponent from "../components/WinnerComponent.vue";

const router = useRouter();

const player = ref(new Board());
const enemy = ref(new Board());
const turn = ref<"player" | "enemy">("player");
const firstSuccessAttack = ref<Cell | null>(null);
const lastSuccessAttack = ref<Cell | null>(null);
const theWinner = ref<"player" | "enemy" | null>(null);

//the player selects a cell to attack
const playerAttack = (cell: Cell) => {
  if (turn.value === "enemy") return;
  if (cell.isMissed || cell.isHitted) return;
  enemy.value.attackShip(cell);
  if (cell.ship) {
    return;
  }
  turn.value = "enemy";
};

//the enemy selects a cell to attack
const enemyAttack = () => {
  let attack = player.value.cells[Math.floor(Math.random() * 99)];

  //if the cell repeats, we look for a new one
  while ((attack.isMissed || attack.isHitted) && !theWinner.value) {
    attack = player.value.cells[Math.floor(Math.random() * 99)];
  }

  if (lastSuccessAttack.value && !lastSuccessAttack.value.ship?.dead) {
    const attacked = lastSuccessAttack.value;

    const cells = player.value.cells.filter((cell) => {
      if (cell.isHitted || cell.isMissed) return;

      //to look for the coordinates for the next shot, if we hit it
      if (attacked.y === firstSuccessAttack.value?.y) {
        if (cell.y === attacked.y) {
          if (
            cell.x == attacked.x - 1 ||
            cell.x == attacked.x + 1 ||
            cell.x == firstSuccessAttack.value.x - 1 ||
            cell.x == firstSuccessAttack.value.x + 1
          ) {
            return cell;
          }
        }
      }

      if (attacked.x === firstSuccessAttack.value?.x) {
        if (cell.x === attacked.x) {
          if (
            cell.y == attacked.y - 1 ||
            cell.y == attacked.y + 1 ||
            cell.y == firstSuccessAttack.value.y - 1 ||
            cell.y == firstSuccessAttack.value.y + 1
          ) {
            return cell;
          }
        }
      }
    });
    if (cells.length) {
      attack = cells[Math.floor(Math.random() * cells.length)];
    }
  }
  if (lastSuccessAttack.value?.ship?.dead) {
    firstSuccessAttack.value = null;
    lastSuccessAttack.value = null;
  }
  if (attack.ship && firstSuccessAttack.value?.ship?.id !== attack.ship?.id) {
    firstSuccessAttack.value = attack;
  }
  if (attack.ship) {
    lastSuccessAttack.value = attack;
  }

  player.value.attackShip(attack);

  if (attack.ship) {
    setTimeout(() => {
      enemyAttack();
    }, 500);
    return;
  }

  setTimeout(() => {
    turn.value = "player";
  }, 500);
};

onMounted(() => {
  const ships = new BattleShips();
  const playerBoard = useBoard.get();
  if (playerBoard === null) {
    return router.push("/");
  }
  player.value.cells = playerBoard;

  enemy.value.autoShipPlace(ships.ships);
});

watch(turn, () => {
  if (turn.value === "enemy") {
    setTimeout(() => {
      enemyAttack();
    }, 500);
  }
});

//checking to see if there were any live ships left
watch(enemy.value, () => {
  if (!enemy.value.cells.some((ship) => ship.ship && !ship.ship?.dead)) {
    setTimeout(() => {
      theWinner.value = "player";
    }, 500);
  }
});

watch(player.value, () => {
  if (!player.value.cells.some((ship) => ship.ship && !ship.ship?.dead)) {
    setTimeout(() => {
      theWinner.value = "enemy";
    }, 500);
  }
});

onDeactivated(() => useBoard.set([]));
</script>

<style scoped>
.boards {
  display: flex;
  gap: 30px;
  @media (max-width: 700px) {
    flex-direction: column;
  }
}

.board {
  height: 100%;
}

p {
  text-align: center;
  padding-bottom: 10px;
}
</style>
