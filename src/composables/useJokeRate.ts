import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useJokeStore } from '@/stores/joke'

export const useJokeRate = () => {
  const store = useJokeStore()
  const { jokes, totalJokes, progress } = storeToRefs(store)
  const currentIndex = ref(0)

  const currentJokeNumber = computed(() => currentIndex.value + 1)
  const currentJoke = computed(() => jokes.value[currentIndex.value])
  const firstJoke = computed(() => currentIndex.value === 0)
  const lastJoke = computed(() => currentIndex.value === totalJokes.value - 1)

  const totalWithStar1 = computed(() => jokes.value.filter(joke => joke.rating === 1).length)
  const totalWithStar2 = computed(() => jokes.value.filter(joke => joke.rating === 2).length)
  const totalWithStar3 = computed(() => jokes.value.filter(joke => joke.rating === 3).length)
  const totalWithStar4 = computed(() => jokes.value.filter(joke => joke.rating === 4).length)
  const totalWithStar5 = computed(() => jokes.value.filter(joke => joke.rating === 5).length)

  const results = computed(() => ({
    1: totalWithStar1.value,
    2: totalWithStar2.value,
    3: totalWithStar3.value,
    4: totalWithStar4.value,
    5: totalWithStar5.value,
  }))

  const aggregateRating = computed(() => {
    const total = jokes.value.reduce((acc, joke) => acc + joke.rating, 0)
    return total / totalJokes.value
  })

  return {
    totalJokes,
    progress,

    currentJoke,
    firstJoke,
    lastJoke,
    currentJokeNumber,

    results,
    aggregateRating,

    previousJoke: () => currentIndex.value--,
    nextJoke: () => currentIndex.value++,
    setRating: store.setRating,
  }
}
