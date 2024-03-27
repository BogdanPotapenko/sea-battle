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
  background: #b3b3e7;
  border: solid 2px #3d3d7c;
  cursor: pointer;
  border-radius: 5px;
}
button:hover {
  border: solid 2px #001fff;
}
</style>
