<script setup lang="ts">
defineProps<{
  status: string
}>()

const statusColors = {
  Alive: 'bg-green-500',
  Dead: 'bg-red-500',
  unknown: 'bg-gray-500',
}
</script>

<template>
  <div class="flex items-center">
    <div
      class="me-2 h-1.5 w-1.5 rounded-full"
      :class="statusColors[status]"
    />
    {{ status }}
  </div>
</template>

<style scoped>

</style>
