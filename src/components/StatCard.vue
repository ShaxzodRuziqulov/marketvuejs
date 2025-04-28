<template>
  <div class="bg-white shadow-md rounded-lg p-6 text-center">
    <h2 class="text-gray-500 text-sm font-semibold">{{ title }}</h2>
    <p class="text-3xl font-bold text-gray-800 mt-2">{{ value }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  value: number
}>()
</script>
