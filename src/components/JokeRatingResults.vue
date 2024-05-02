<template>
  <div class="p-10 bg-black rounded-lg shadow-lg shadow-gray-700">
    <h3 class="font-bold text-xl">Results</h3>

    <div class="flex items-center my-2">
      <div class="rating">
        <input
          v-for="i in 5"
          :checked="i === Math.floor(aggregateRating)"
          :key="i"
          type="radio"
          name="rating-2"
          class="mask mask-star-2 bg-orange-400"
        />
      </div>

      <p class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
        {{ aggregateRating.toFixed(2) }}
      </p>
      <p class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
        out of
      </p>
      <p class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">5</p>
    </div>
    <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
      {{ totalJokes }} total ratings
    </p>

    <div class="space-y-4 mt-4">
      <div
        v-for="(value, key) in results"
        :key="key"
        class="flex gap-3 items-center"
      >
        <span class="text-sm flex-shrink-0">{{ key }} star</span>
        <progress
          class="progress progress-error w-full"
          :value="value"
          :max="totalJokes"
        ></progress>
        <span class="text-sm flex-shrink-0 w-9">
          {{ ((value / totalJokes) * 100).toFixed(2) }}%
        </span>
      </div>
    </div>

    <div class="mt-8 text-center">
      <button @click="$emit('reset')" class="btn btn-primary">
        Start Over
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useJokeRate } from '@/composables/useJokeRate'

const { results, totalJokes, aggregateRating } = useJokeRate()

defineEmits(['reset'])
</script>
