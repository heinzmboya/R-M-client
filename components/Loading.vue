<template>
  <section class="fixed inset-0 z-10 bg-white/30">
    <div class="flex items-center justify-center">
      <div class="relative top-40">
        <!-- Outer Ring -->
        <div
          class="absolute h-12 w-12 border-4 border-gray-200 rounded-full border-dashed"
        />

        <!-- Inner Ring -->
        <div
          class="absolute h-12 w-12 animate-spin border-4 border-blue-500 border-t-transparent rounded-full border-dashed"
        />
      </div>
    </div>
  </section>
</template>
