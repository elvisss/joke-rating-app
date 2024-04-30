<template>
  <h1 class="text-3xl font-bold underline">
    Welcome to the Joke App Rating System
  </h1>
  <p class="text-lg">This is a simple app that allows you to rate jokes.</p>
  <div>
    <label>Select joke type: {{ jokeType }}</label>
    <select v-model="jokeType">
      <option value="" selected disabled>Select joke type</option>
      <option value="general">General</option>
      <option value="programming">Programming</option>
      <option value="knock-knock">Knock knock</option>
      <option value="all">All</option>
    </select>
  </div>

  <div>
    <label>
      Select how many jokes you want to rate: {{ jokesQuantity }}
      <hr />

      <input type="radio" id="ten" :value="10" v-model.number="jokesQuantity" />
      <label for="ten">10</label>

      <input
        type="radio"
        id="twenty"
        :value="20"
        v-model.number="jokesQuantity"
      />
      <label for="twenty">20</label>

      <input
        type="radio"
        id="twirty"
        :value="30"
        v-model.number="jokesQuantity"
      />
      <label for="twirty">30</label>
    </label>
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
import type { JokeType } from '@/types'

const jokeType = ref<JokeType>('all')
const jokesQuantity = ref(0)

const { isLoading, isError, jokes, fetchJokes } = useJokes(
  jokeType,
  jokesQuantity
)
</script>
