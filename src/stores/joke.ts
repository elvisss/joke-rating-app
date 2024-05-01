import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Joke, JokeId } from '@/types'
// import jokesMock from '@/mocks/ten-jokes.json'

export const useJokeStore = defineStore('joke', () => {
  const jokes = ref<Joke[]>([])
  // const jokes = ref<Joke[]>((jokesMock as any).map((joke: Joke) => ({ ...joke, rating: 0 })))

  const totalJokes = computed(() => jokes.value.length)
  const jokesRated = computed(() => jokes.value.filter(joke => joke.rating > 0))
  const progress = computed(() => (jokesRated.value.length / totalJokes.value) * 100)

  function setJokes(newJokes: Joke[]) {
    jokes.value = newJokes.map(joke => ({ ...joke, rating: 0 }))
  }

  function setRating(jokeid: JokeId, rating: number) {
    const index = jokes.value.findIndex(j => j.id === jokeid)
    jokes.value[index].rating = rating
  }

  return {
    // state
    jokes,

    // getters
    totalJokes,
    progress,

    // methods
    setJokes,
    setRating,
  }
})
