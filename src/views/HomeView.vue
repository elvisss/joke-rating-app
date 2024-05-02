<template>
  <div
    class="h-screen w-screen flex items-center justify-center text-white px-14 overflow-hidden"
  >
    <div class="relative w-[500px]">
      <Transition name="slide-up">
        <div class="rating-step" v-if="ratingState === 'initial'">
          <JokeHero
            title="Joke App Rating"
            description="This is a simple app that allows you to rate jokes."
            @completed="ratingState = 'selection'"
          />
        </div>

        <div class="rating-step" v-else-if="ratingState === 'selection'">
          <JokeConfig @completed="handleConfigCompleted" />
        </div>

        <div class="rating-step text-center" v-else-if="ratingState === 'started'">
          <template v-if="isLoading">
            <span class="loading loading-bars loading-lg"></span>
          </template>
          <template v-else-if="isError">An error ocurred, please try later</template>
          <template v-else>
            <JokeRating @completed="ratingState = 'completed'" />
          </template>
        </div>

        <div class="rating-step" v-else-if="ratingState === 'completed'">
          <JokeRatingResults @reset="handleReset" />
        </div>
      </Transition>
    </div>
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

function handleConfigCompleted({
  type,
  quantity,
}: {
  type: JokeType
  quantity: number
}) {
  ratingState.value = 'started'
  jokeType.value = type
  jokesQuantity.value = quantity
  fetchJokes()
}

function handleReset() {
  ratingState.value = 'selection'
  jokeType.value = 'all'
  jokesQuantity.value = 0
}
</script>

<style>
.rating-step {
  @apply absolute left-0 right-0 top-1/2 -translate-y-1/2 text-center
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
