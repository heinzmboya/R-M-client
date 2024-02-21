<script setup lang="ts">
import { searchOptionsEnum } from '~/constants'

const store = useStore()
const { searchTerm, onSearch } = toRefs(store)

const searchOptions = Object.values(searchOptionsEnum)
const selectedOption = ref<searchOptionsEnum>(searchOptionsEnum.LOCATION)
</script>

<template>
  <section class="sticky top-0 z-10 flex items-center gap-x-5 py-4 backdrop-blur-lg backdrop-filter">
    <!-- input -->
    <div>
      <label for="table-search" class="sr-only">Search</label>
      <div class="relative">
        <div
          class="pointer-events-none absolute start-0 inset-y-0 flex items-center ps-3 rtl:inset-r-0"
        >
          <div i-carbon:search h-4 w-4 text-gray-500 />
        </div>
        <input
          id="table-search"
          v-model="searchTerm"
          type="text"
          class="block w-80 border border-gray-300 rounded-lg bg-gray-50 py-2 ps-10 text-sm text-gray-900 focus:(border-blue-500 outline-none ring-blue-500)"
          placeholder="Search for locations..."
        >
      </div>
    </div>

    <!-- radios -->
    <ul
      class="w-full select-none items-center overflow-hidden border border-gray-200 rounded-lg bg-white text-sm text-gray-900 font-medium sm:flex"
    >
      <li
        v-for="opt in searchOptions"
        :key="opt"
        class="store.border-gray-200 w-full border-b last:border-r-0 sm:(border-b-0 border-r) hover:bg-gray-50"
      >
        <div
          class="flex items-center"
          :title="`Search/filter by ${opt} name`"
        >
          <input
            :id="opt"
            v-model="selectedOption"
            type="radio"
            :value="opt"
            name="list-radio"
            class="hidden border-gray-300 bg-gray-100 text-blue-600"
          >
          <label
            :for="opt"
            class="w-full flex items-center py-3 ps-2 text-sm text-gray-900 font-medium"
            :class="selectedOption === opt && 'bg-blue-50'"
          >
            {{ opt }}
            <div
              v-show="selectedOption === opt"
              i-carbon:checkmark-outline
              ml-2
              text-blue-500
            />
          </label>
        </div>
      </li>
    </ul>

    <!-- btn -->
    <button
      type="button"
      class="me-2 inline-flex items-center border border-gray-200 rounded-lg bg-white px-5 py-2.5 text-center text-sm text-gray-900 font-medium hover:bg-gray-100 focus:(outline-none ring-2 ring-gray-100)"
      @click="onSearch(selectedOption)"
    >
      Search
    </button>
  </section>
</template>
