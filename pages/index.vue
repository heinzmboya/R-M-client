<script setup lang="ts">
const store = useStore()

const { locationData, isLoading } = toRefs(store)
</script>

<template>
  <div>
    <Loading v-if="isLoading" />

    <div mx-a w-4xl>
      <Search />

      <section v-if="locationData?.length" space-y-20>
        <div v-for="loc in locationData" :key="loc.id">
          <div flex items-center text-lg text-gray-700>
            <div i-carbon:location-filled />
            <span font-bold>{{ loc.name }}</span>
            <span ml-2 text-xs>(location name)</span>
          </div>

          <Residents :residents="loc.residents" :locationId="loc.id" />

          <section v-if="!loc.residents.length" mt-10 text-center text-sm text-slate-4 font-medium>
            Locations has no residents
          </section>
        </div>
      </section>

      <section v-else mt-10 text-center text-sm text-slate-4 font-medium>
        No locations found for that search keyword
      </section>
    </div>
  </div>
</template>
