import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Joke } from '@/types'

export const useJokeStore = defineStore('joke', () => {
  const jokes = ref<Joke[]>([])

  function setJokes(newJokes: Joke[]) {
    jokes.value = newJokes
  }

  return {
    // state
    jokes,

    // methods
    setJokes,
  }
})
