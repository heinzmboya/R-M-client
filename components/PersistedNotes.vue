<script setup lang="ts">
import { useStorage } from '@vueuse/core'

const { residentId } = defineProps<{
  residentId: string
}>()

// persists in local storage
const notes = useStorage('res-notes', {})

function clearNotes() {
  delete notes.value[residentId]
}
</script>

<template>
  <div>
    <textarea
      id=""
      v-model="notes[residentId]"
      name="" cols="25" rows="12"
      class="focus:ring-primary-500 block resize-none border-0 rounded-2xl bg-gray-50 p-10 text-sm text-gray-900 font-medium shadow-sm ring-1 ring-gray-300 ring-inset focus:(outline-none)"
      placeholder="Add persisted notes about the character..."
      spellcheck="false"
    />
    <button
      float-right m-4 text-sm btn
      :disabled="!notes[residentId]"
      @click="clearNotes"
    >
      Clear notes
    </button>
  </div>
</template>
