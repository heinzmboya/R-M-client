import { acceptHMRUpdate, defineStore } from 'pinia'
import locationQuery from '~/queries/getLocations.gql'
import charsQuery from '~/queries/getChars.gql'
import episodeQuery from '~/queries/getEpisodes.gql'
import { searchOptionsEnum } from '~/constants'

function groupByLocation(arr: any[] = []) {
  return Object.values(arr.reduce((grouped, item) => {
    const { id, name } = item.location
    if (!grouped[id])
      grouped[id] = { id, name, residents: [] }

    grouped[id].residents.push({ ...item })
    return grouped
  }, {}))
}

export const useStore = defineStore('user', () => {
  const selectedOption = ref<searchOptionsEnum>(searchOptionsEnum.LOCATION)

  const searchTerm = ref('')
  const queryVariables = reactive({ page: 1, name: searchTerm.value })

  const locationRes = useLazyAsyncQuery(locationQuery, queryVariables)

  const charsRes = useLazyQuery(charsQuery, queryVariables)

  const episodeRes = useLazyQuery(episodeQuery, queryVariables)

  const searchData = computed(() => {
    return {
      [searchOptionsEnum.LOCATION]: {
        data: locationRes.data.value?.locations?.results,
        onSearch: locationRes.refresh,
      },
      [searchOptionsEnum.CHARACTER]: {
        data: groupByLocation(charsRes.result.value?.characters?.results),
        onSearch: charsRes.load || charsRes.refetch,
      },

      [searchOptionsEnum.EPISODE]: {
        data: groupByLocation(episodeRes.result.value?.episodes?.results.flatMap(result => result.characters)),
        onSearch: episodeRes.load || episodeRes.refetch,
      },
    }
  })
  const locationData = computed(() => searchData.value[selectedOption.value].data)

  const isLoading = computed(() => locationRes.pending.value || charsRes.loading.value || episodeRes.loading.value)

  async function onSearch(searchOption: searchOptionsEnum) {
    queryVariables.name = searchTerm.value

    await searchData.value[searchOption].onSearch()

    selectedOption.value = searchOption
  }

  return {
    // states
    searchTerm,
    isLoading,
    // fns
    onSearch,
    // data
    locationData,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
