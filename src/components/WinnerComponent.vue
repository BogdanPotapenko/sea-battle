<template>
  <div class="winner">
    <h2>
      {{
        winner === "player"
          ? "Congratulations, you win!"
          : "Unfortunately, you lost!"
      }}
    </h2>
    <button-component @click="router.push('/')" value="New game" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import ButtonComponent from "../components/ButtonComponent.vue";

defineProps<{
  winner: string;
}>();

const router = useRouter();
</script>

<style scoped>
.winner {
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  height: 100vh;
}
</style>
