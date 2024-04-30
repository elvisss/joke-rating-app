import type { Ref } from 'vue'
import { ref } from 'vue'
import type { Joke, JokeType } from '@/types'
import { getJokes } from '@/services/jokes'

export const useJokes = (jokeType: Ref<JokeType>, quantity: Ref<number>) => {
  const jokes = ref<Joke[]>([])
  const isLoading = ref<boolean>(false)
  const isError = ref<boolean>(false)

  const fetchJokes = async () => {
    console.log(jokeType.value, quantity.value)
    try {
      isLoading.value = true
      isError.value = false
      const response = await getJokes(jokeType.value, quantity.value)
      jokes.value = response
    } catch (err) {
      console.log(err)
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  return {
    // state
    isLoading,
    isError,
    jokes,

    // methods
    fetchJokes
  }
}
