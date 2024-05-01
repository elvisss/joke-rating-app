import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useJokeStore } from '@/stores/joke'

export const useJokeRate = () => {
  const store = useJokeStore()
  const { jokes, totalJokes, progress } = storeToRefs(store)
  const currentIndex = ref(0)
  // const currentJoke = ref<Joke>(jokes.value[currentIndex.value])

  const currentJokeNumber = computed(() => currentIndex.value + 1)
  const currentJoke = computed(() => jokes.value[currentIndex.value])
  const firstJoke = computed(() => currentIndex.value === 0)
  const lastJoke = computed(() => currentIndex.value === totalJokes.value - 1)

  function submitRating() {
    console.log('submitRating')
  }

  return {
    totalJokes,
    progress,

    currentJoke,
    firstJoke,
    lastJoke,
    currentJokeNumber,

    previousJoke: () => currentIndex.value--,
    nextJoke: () => currentIndex.value++,
    setRating: store.setRating,
    submitRating,
  }
}
