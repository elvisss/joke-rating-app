<template>
  <div
    class="h-screen w-screen flex items-center justify-center text-white px-14"
  >
    <template v-if="configState === 'initial'">
      <JokeHero
        title="Joke App Rating"
        description="This is a simple app that allows you to rate jokes."
        @completed="configState = 'selection'"
      />
    </template>

    <template v-if="configState === 'selection'">
      <JokeConfig @completed="handleConfigCompleted" />
    </template>

    <template v-if="configState === 'started'">
      <div v-if="isLoading">
        <span class="loading loading-bars loading-lg"></span>
      </div>
      <div v-else-if="isError">An error ocurred, please try later</div>

      <template v-else>
        <JokeRating />
      </template>

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

type ConfigState = 'initial' | 'selection' | 'started'

const configState = ref<ConfigState>('initial')

const jokeType = ref<JokeType>('all')
const jokesQuantity = ref(0)

function handleConfigCompleted({ type, quantity }: { type: JokeType, quantity: number }) {
  configState.value = 'started'
  jokeType.value = type
  jokesQuantity.value = quantity
  fetchJokes()
}

const { isLoading, isError, fetchJokes } = useJokes(
  jokeType,
  jokesQuantity
)
</script>
