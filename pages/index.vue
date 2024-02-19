<script setup lang="ts">
import locationQuery from '~/constants/getLocations.gql'

const variables = { page: 1, loc_name: '' }
const { data = {} } = await useAsyncQuery(locationQuery, variables)
</script>

<template>
  <div mx-a w-4xl space-y-20>
    <div v-for="loc in data?.locations?.results" :key="loc.id">
      <p text-xs text-gray-700>
        Location: <span font-bold>{{ loc.name }}</span>
      </p>

      <!-- table of residents -->
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-left text-sm text-gray-500 rtl:text-right">
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
            <tr v-for="resident in loc.residents.slice(0, 5)" :key="resident.name" class="border-b border-gray-200 dark:border-gray-700">
              <th scope="row" class="w-100 flex items-center whitespace-nowrap bg-gray-50 px-6 py-4 text-gray-900">
                <img class="h-10 w-10 rounded-full" :src="resident.image" alt="image">
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
              <td class="bg-gray-50 px-6 py-4">
                {{ resident.gender }}
              </td>
              <td class="px-6 py-4">
                {{ resident.id }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
