<template>
  <button>{{ value }}</button>
</template>

<script setup lang="ts">
defineProps<{
  value: string;
}>();
</script>
<style scoped>
button {
  padding: 5px;
  width: 100px;
  min-height: 30px;
  background: var(--primary);
  border: solid 2px var(--secondary);
  border-radius: 5px;
  color: var(--black);
}
button:hover {
  border: solid 2px var(--hover);
}
</style>
