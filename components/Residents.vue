<script setup lang="ts">
const { locationId = 'null' } = defineProps<{
  residents: any[]
  locationId: string | null // 'unknown' locations have null ids
}>()
</script>

<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full bg-white/60 text-left text-sm text-gray-500 rtl:text-right">
      <thead class="text-xs text-gray-700">
        <tr>
          <th scope="col" class="w-100 bg-gray-50 px-6 py-3">
            Residents
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
          v-for="resident in residents.slice(0, 5)"
          :key="resident.id"
          class="group cursor-pointer border-b border-gray-200 hover:bg-gray-100"
          @click="navigateTo(`/resident-${resident.id}-${locationId}`)"
        >
          <th
            scope="row"
            class="w-100 flex items-center whitespace-nowrap bg-gray-50/50 px-6 py-4 text-gray-900 group-hover:bg-gray-100"
          >
            <img
              class="h-10 w-10 rounded-full"
              :src="resident.image"
              alt="image"
            >
            <div class="ps-3">
              <div class="whitespace-nowrap text-gray-900 font-medium">
                {{ resident.name }}
              </div>
              <div class="text-xs text-gray-500 font-normal">
                {{ resident.species }}
              </div>
            </div>
          </th>

          <td class="px-6 py-4">
            {{ resident.status }}
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
  </div>
</template>

<style scoped>

</style>
