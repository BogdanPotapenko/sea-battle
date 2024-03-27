import { ref } from "vue";
import { Cell } from "./board";

function board() {
  const board = ref<Cell[] | null>(null);

  const get = () => (board.value ? board.value : null);
  const set = (value: Cell[]) => (board.value = value);

  return {
    get,
    set,
  };
}

export const useBoard = board();
