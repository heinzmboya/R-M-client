<script setup lang="ts">
const { residents, locationId = 'null' } = defineProps<{
  residents: any[]
  locationId: string | null // 'unknown' locations have null ids
}>()

const loadedItemsCount = ref(5)

const displayedResidents = computed(() => {
  return residents.slice(0, loadedItemsCount.value)
})
const hasMoreItems = computed(() => loadedItemsCount.value < residents.length)

function loadMore() {
  loadedItemsCount.value += 5
}
</script>

<template>
  <div class="relative overflow-x-auto">
    <table
      class="w-full rounded-lg bg-white/60 text-left text-sm text-gray-500 shadow-md rtl:text-right"
    >
      <thead class="text-xs text-gray-700">
        <tr>
          <th scope="col" class="w-100 bg-gray-50 px-6 py-3">
            Resident
          </th>
          <th scope="col" class="px-6 py-3">
            Status
          </th>
          <th scope="col" class="bg-gray-50 px-6 py-3">
            Gender
          </th>
          <th scope="col" class="px-6 py-3">
            id
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="resident in displayedResidents"
          :key="resident.id"
          class="group cursor-pointer border-b border-gray-200 hover:bg-gray-100"
          @click="navigateTo(`/resident-${resident.id}-${locationId}`)"
        >
          <th
            scope="row"
            class="w-100 flex items-center whitespace-nowrap bg-gray-50/50 px-6 py-4 text-gray-900 group-hover:bg-gray-100"
          >
            <NuxtImg
              class="h-10 w-10 rounded-full"
              :src="resident.image"
              alt="image"
            />
            <div class="ps-3">
              <div class="whitespace-nowrap text-gray-900 font-medium">
                {{ resident.name }}
              </div>
              <div class="text-xs text-gray-500 font-normal">
                {{ resident.species }}
              </div>
            </div>
          </th>

          <td class="px-6 py-4 pl-4">
            <BaseStatus :status="resident.status" />
          </td>
          <td class="bg-gray-50 px-6 py-4 group-hover:bg-gray-100">
            {{ resident.gender }}
          </td>
          <td class="px-6 py-4">
            {{ resident.id }}
          </td>
        </tr>
      </tbody>
    </table>

    <button v-if="hasMoreItems" text-xs icon-btn @click="loadMore">
      Showing {{ loadedItemsCount }}/{{ residents?.length }} Click to load more
    </button>
  </div>
</template>
