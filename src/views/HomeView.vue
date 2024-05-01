<template>
  <div
    class="h-screen w-screen flex items-center justify-center text-white px-14"
  >
    <template v-if="status === 'initial'">
      <JokeHero
        title="Joke App Rating"
        description="This is a simple app that allows you to rate jokes."
        @completed="status = 'selection'"
      />
    </template>

    <template v-if="status === 'selection'">
      <JokeConfig
        @completed="status = 'started'"
      />
    </template>
  </div>

  <div>
    <button type="button" @click="fetchJokes">Start rating</button>
  </div>

  <div v-if="isLoading">Loading...</div>
  <div v-else-if="isError">Error</div>

  <ul v-else-if="jokes.length">
    <li v-for="joke in jokes" :key="joke.id">
      <p>text: {{ joke.setup }}</p>
      <p>punchline: {{ joke.punchline }}</p>
    </li>
  </ul>

  <div v-else>No jokes to display</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useJokes } from '../composables/useJokes'
import { JokeType } from '@/types.d'
import JokeHero from '@/components/JokeHero.vue'
import JokeConfig from '@/components/JokeConfig.vue'

type Status = 'initial' | 'selection' | 'started'

const status = ref<Status>('initial')

const jokeType = ref<JokeType>(JokeType.All)
const jokesQuantity = ref(0)

const { isLoading, isError, jokes, fetchJokes } = useJokes(
  jokeType,
  jokesQuantity
)
</script>
