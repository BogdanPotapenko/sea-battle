<template>
  <div class="winner">
    <div v-if="winner === 'player'">Congratulations, you won!</div>
    <div v-else>Unfortunately, you lost!</div>
    <button-component @click="router.push('/prepare')" value="New game" />
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
