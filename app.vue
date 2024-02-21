<script setup lang="ts">
import { appName } from '~/constants'

useHead({
  title: appName,
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html,
body,
#__nuxt {
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  background: #222;
  color: white;
}

::-webkit-scrollbar-track {
  --at-apply: bg-teal-100;
  border-radius: 10px;
}

::-webkit-scrollbar {
  width: 10px;
  --at-apply: bg-teal-100;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  --at-apply: from-rose-300 to-teal-400 bg-gradient-to-b;
}
</style>
