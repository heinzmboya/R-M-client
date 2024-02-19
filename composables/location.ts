import { acceptHMRUpdate, defineStore } from 'pinia'
import locationQuery from '~/queries/getLocations.gql'
import charsQuery from '~/queries/getChars.gql'

enum searchOptionsEnum {
  LOCATION = 'location',
  CHARACTER = 'character',
  EPISODE = 'episode',
}

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
  const searchOptions = Object.values(searchOptionsEnum)
  const selectedOption = ref<searchOptionsEnum>(searchOptionsEnum.LOCATION)

  const searchTerm = ref('test')
  const queryVariables = reactive({ page: 1, name: searchTerm.value })

  const { data, refresh, pending: isPending } = useLazyAsyncQuery(locationQuery, queryVariables)

  const { result: charData, load: loadByCharName, refetch: refetchByCharName, loading: isCharFetchPending, ...others } = useLazyQuery(charsQuery, queryVariables)

  const searchData = computed(() => {
    const dt = charData.value?.characters?.results
    return groupByLocation(dt)
    // return {
    //   [searchOptionsEnum.LOCATION]: groupByLocation(charData.value?.characters?.results),
    // }
  })
  const locationData = computed(() => searchData.value.length ? searchData.value : data.value?.locations?.results || [])

  const isLoading = computed(() => isPending.value || isCharFetchPending.value)

  async function onSearch() {
    queryVariables.name = searchTerm.value

    if (selectedOption.value === searchOptionsEnum.CHARACTER)
      return await loadByCharName() || refetchByCharName()

    await refresh()
  }

  async function onLog() {
    // eslint-disable-next-line no-console
    console.log('others', others, charData.value, {
      [searchOptionsEnum.LOCATION]: 'tt',
    })
  }

  return {
    // states
    searchOptions,
    selectedOption,
    searchTerm,
    // fns
    onSearch,
    onLog,
    // querydata
    locationData,
    isLoading,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
