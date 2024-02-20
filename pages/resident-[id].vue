<script setup lang="ts">
const route = useRoute<'resident-id'>()
const id = route.params.id

const store = useStore()

const resDetails = computed(() => {
  const [resId, locId] = id.split('-')
  return { resId, locId }
})

const resident = computed(() => {
  const location = store.locationData.find((loc: any) => loc.id === resDetails.value.locId)
  const resident = location?.residents
    .find((res: any) => {
      return res.id === resDetails.value.resId
    })

  if (!resident)
    return

  return {
    ...resident,
    location,
  }
})
</script>

<template>
  <div>
    <!-- <div i-twemoji:waving-hand inline-block animate-shake-x animate-duration-5000 text-4xl /> -->

    <div>
      <NuxtLink
        class="m-3 text-sm btn"
        to="/"
      >
        Back
      </NuxtLink>
    </div>

    <!-- card -->
    <div v-if="resident" class="mx-auto w-96 flex flex-col justify-center rounded-2xl bg-white/40 shadow-slate-300/60 shadow-xl">
      <!-- img -->
      <img class="aspect-video w-96 rounded-t-2xl object-cover object-center" :src="resident.image">
      <!-- text information -->
      <div class="p-4">
        <small class="text-xs text-blue-400">{{ resident.species }}</small>
        <h1 class="pb-2 text-2xl text-slate-600 font-medium">
          {{ resident.name }}
        </h1>
        <div class="text-sm text-slate-400 font-light leading-6 tracking-tight">
          <p>{{ resident.id }} - {{ resident.status }} - {{ resident.gender }}</p>

          <section flex items-center gap-x-2>
            <p i-carbon:location-filled />
            <p>{{ resident.location.name }}</p>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
