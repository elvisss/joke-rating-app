<template>
  <div
    class="h-screen w-screen flex items-center justify-center text-white px-14"
  >
    <template v-if="ratingState === 'initial'">
      <JokeHero
        title="Joke App Rating"
        description="This is a simple app that allows you to rate jokes."
        @completed="ratingState = 'selection'"
      />
    </template>

    <template v-if="ratingState === 'selection'">
      <JokeConfig @completed="handleConfigCompleted" />
    </template>

    <template v-if="ratingState === 'started'">
      <div v-if="isLoading">
        <span class="loading loading-bars loading-lg"></span>
      </div>
      <div v-else-if="isError">An error ocurred, please try later</div>

      <template v-else>
        <JokeRating @completed="ratingState = 'completed'" />
      </template>
    </template>

    <template v-if="ratingState === 'completed'">
      <JokeRatingResults
        @reset="handleReset"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useJokes } from '../composables/useJokes'
import type { JokeType } from '@/types'
import JokeHero from '@/components/JokeHero.vue'
import JokeConfig from '@/components/JokeConfig.vue'
import JokeRating from '@/components/JokeRating.vue'
import JokeRatingResults from '@/components/JokeRatingResults.vue'

type RatingState = 'initial' | 'selection' | 'started' | 'completed'

const ratingState = ref<RatingState>('initial')

const jokeType = ref<JokeType>('all')
const jokesQuantity = ref(0)

const { isLoading, isError, fetchJokes } = useJokes(jokeType, jokesQuantity)

function handleConfigCompleted({ type, quantity }: { type: JokeType, quantity: number }) {
  ratingState.value = 'started'
  jokeType.value = type
  jokesQuantity.value = quantity
  fetchJokes()
}

function handleReset () {
  ratingState.value = 'selection'
  jokeType.value = 'all'
  jokesQuantity.value = 0
}
</script>
