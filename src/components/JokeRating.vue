<template>
  <div class="flex flex-col w-96 rounded-lg shadow-lg shadow-gray-700">
    <div class="flex flex-col items-center p-10 bg-neutral">
      <h2 class="text-3xl font-bold mb-5">Joke Rating</h2>
      <progress
        class="progress progress-primary w-56"
        :value="progress"
        max="100"
      ></progress>
      <div>{{ currentJokeNumber }}/{{ totalJokes }}</div>
    </div>

    <div class="p-5 h-96 bg-black flex flex-col justify-between">
      <JokeItem
        :joke="currentJoke"
        @rated="({ jokeid, rate }) => setRating(jokeid, rate)"
      />
    </div>

    <div class="flex bg-black justify-between p-3">
      <button
        class="btn btn-outline btn-accent"
        :disabled="firstJoke"
        @click="previousJoke"
      >
        ← Previous Joke
      </button>
      <button
        v-if="!lastJoke"
        class="btn btn-outline btn-accent"
        :disabled="currentJoke.rating === 0"
        @click="nextJoke"
      >
        Next Joke →
      </button>
      <button
        v-else
        class="btn btn-outline btn-primary"
        :disabled="currentJoke.rating === 0"
        @click="submitRating"
      >
        Submit Rating
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import JokeItem from '@/components/JokeItem.vue'
import { useJokeRate } from '@/composables/useJokeRate'

const {
  currentJoke,
  currentJokeNumber,
  totalJokes,
  firstJoke,
  lastJoke,
  progress,
  nextJoke,
  previousJoke,
  setRating,
  submitRating,
} = useJokeRate()
</script>
