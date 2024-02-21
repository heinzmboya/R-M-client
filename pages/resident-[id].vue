<script setup lang="ts">
const route = useRoute<'resident-id'>()
const id = route.params.id

const store = useStore()

const resDetails = computed(() => {
  const [resId, locId] = id.split('-')
  return { resId, locId }
})

const resident = computed(() => {
  const location = store.locationData.find(loc => loc.id ? loc.id === resDetails.value.locId : loc.name === 'unknown')

  const resident = location?.residents
    .find((res) => {
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
  <div flex justify-center gap-x-5 font-medium>
    <section>
      <button
        class="flex items-center gap-x-2 rounded-2xl text-sm btn"
        @click="$router.go(-1)"
      >
        <div i-carbon:arrow-left />
        <span>Back</span>
      </button>
    </section>

    <template v-if="resident">
      <!-- resident card -->
      <section class="w-96 rounded-2xl bg-white/40 shadow-slate-300/60 shadow-xl">
        <!-- img -->
        <NuxtImg class="aspect-video w-96 rounded-t-2xl object-cover object-center" :src="resident.image" />
        <!-- text information -->
        <div class="p-4">
          <small class="text-xs text-blue-400">{{ resident.species }}</small>
          <h1 class="pb-2 text-2xl text-slate-600 font-medium">
            {{ resident.name }}
          </h1>
          <BaseStatus :status="resident.status" />

          <div class="text-sm text-slate-400 font-light leading-6 tracking-tight">
            <p>{{ resident.id }} - {{ resident.gender }}</p>

            <section flex items-center gap-x-2>
              <p i-carbon:location-filled />
              <p>{{ resident.location.name }}</p>
            </section>
          </div>
        </div>
      </section>

      <!-- persisted notes -->
      <PersistedNotes :residentId="resident.id" />
    </template>
  </div>
</template>
