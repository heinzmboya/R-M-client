import { acceptHMRUpdate, defineStore } from 'pinia'
import locationQuery from '~/queries/getLocations.gql'

enum searchOptionsEnum {
  LOCATION = 'location',
  CHARACTER = 'character',
  EPISODE = 'episode',
}

export const useStore = defineStore('user', () => {
  /**
   * Current named of the user.
   */
  const searchOptions = Object.values(searchOptionsEnum)
  const selectedOption = ref<searchOptionsEnum>(searchOptionsEnum.CHARACTER)

  const searchTerm = ref('test')
  const queryVariables = reactive({ page: 1, name: searchTerm.value })

  const { data, refresh, pending: isPending } = useLazyAsyncQuery(locationQuery, queryVariables)

  const locationData = computed(() => data.value?.locations?.results || [])

  /**
   * Changes the current name of the user and saves the one that was used
   * before.
   *
   * @param name - new name to set
   */
  async function onSearch() {
    queryVariables.name = searchTerm.value

    await refresh()
    // console.log('searchTerm', searchTerm.value, selectedOption.value)

    // if (selectedOption.value === searchOptionsEnum.CHARACTER)
    //   console.log('searchTerm', searchTerm.value, selectedOption.value)
  }

  return {
    // states
    searchOptions,
    selectedOption,
    searchTerm,
    // fns
    onSearch,
    // querydata
    locationData,
    isPending,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
