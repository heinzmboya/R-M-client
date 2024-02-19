<script setup lang="ts">
const store = useStore()
</script>

<template>
  <section class="flex items-center gap-x-5 pb-4">
    <!-- input -->
    <div class="bg-white">
      <label for="table-search" class="sr-only">Search</label>
      <div class="relative">
        <div
          class="pointer-events-none absolute start-0 inset-y-0 flex items-center ps-3 rtl:inset-r-0"
        >
          <div i-carbon:search h-4 w-4 text-gray-500 />
        </div>
        <input
          id="table-search"
          v-model="store.searchTerm"
          type="text"
          class="block w-80 border border-gray-300 rounded-lg bg-gray-50 py-2 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          placeholder="Search for items"
        >
      </div>
    </div>

    <!-- radios -->
    <ul
      class="w-full select-none items-center border border-gray-200 rounded-lg bg-white text-sm text-gray-900 font-medium sm:flex"
    >
      <li
        v-for="opt in store.searchOptions"
        :key="opt"
        class="store.border-gray-200 w-full border-b last:border-r-0 sm:(border-b-0 border-r) hover:bg-gray-50"
      >
        <div class="flex items-center ps-3">
          <input
            :id="opt"
            v-model="store.selectedOption"
            type="radio"
            :value="opt"
            name="list-radio"
            class="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600"
          >
          <label
            :for="opt"
            class="ms-2 w-full py-3 text-sm text-gray-900 font-medium"
          >{{ opt }}
          </label>
        </div>
      </li>
    </ul>

    <!-- btn -->
    <button type="button" class="me-2 inline-flex items-center border border-gray-200 rounded-lg bg-white px-5 py-2.5 text-center text-sm text-gray-900 font-medium hover:bg-gray-100 focus:(outline-none ring-2 ring-gray-100)" @click="store.onSearch">
      Search
    </button>
    <!-- <button type="button" class="me-2 inline-flex items-center border border-gray-200 rounded-lg bg-white px-5 py-2.5 text-center text-sm text-gray-900 font-medium hover:bg-gray-100 focus:(outline-none ring-2 ring-gray-100)" @click="store.onLog">
      onlog
    </button> -->
  </section>
</template>
