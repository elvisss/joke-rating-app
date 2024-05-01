import type { Ref } from 'vue'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

import type { JokeType } from '@/types'
import { getJokes } from '@/services/jokes'
import { useJokeStore } from '@/stores/joke'
// import jokesMock from '@/mocks/ten-jokes.json'

export const useJokes = (jokeType: Ref<JokeType>, quantity: Ref<number>) => {
  const store = useJokeStore()
  const { jokes } = storeToRefs(store)

  const isLoading = ref<boolean>(false)
  const isError = ref<boolean>(false)

  const fetchJokes = async () => {
    try {
      isLoading.value = true
      isError.value = false
      const response = await getJokes(jokeType.value, quantity.value)
      // const response = jokesMock as any
      store.setJokes(response)
    } catch (err) {
      // console.log(err)
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    isError,
    jokes,

    fetchJokes
  }
}
