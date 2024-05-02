<template>
  <div class="flex flex-col rounded-lg shadow-lg shadow-gray-700">
    <div class="flex flex-col items-center p-10 bg-neutral">
      <h2 class="text-3xl font-bold mb-5">Joke Rating</h2>
      <progress
        class="progress progress-primary w-56"
        :value="progress"
        max="100"
      ></progress>
      <div>{{ currentJokeNumber }}/{{ totalJokes }}</div>
    </div>

    <div class="p-5 h-96 bg-black text-left">
      <div class="relative h-full">
        <Transition name="fade" mode="out-in">
          <JokeItem
            :key="currentJoke.id"
            :joke="currentJoke"
            @rated="({ jokeid, rate }) => setRating(jokeid, rate)"
          />
        </Transition>
      </div>
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
        @click="$emit('completed')"
      >
        View Results
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import JokeItem from '@/components/JokeItem.vue'
import { useJokeRate } from '@/composables/useJokeRate'

defineEmits(['completed'])

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
} = useJokeRate()
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
  position: absolute;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
