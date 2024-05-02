<template>
  <div class="flex flex-col justify-between h-full w-full">
    <div>
      <p class="mb-3">
        Type:
        <span class="badge badge-primary capitalize">{{ joke.type }}</span>
      </p>
      <div class="collapse collapse-arrow bg-base-200">
        <input type="checkbox" v-model="opened" />
        <div class="collapse-title text-xl font-medium">
          {{ joke.setup }}
        </div>
        <div class="collapse-content">
          <p>{{ joke.punchline }}</p>
        </div>
      </div>
    </div>

    <div class="flex justify-center">
      <div class="rating rating-lg">
        <input
          v-model.number="rating"
          type="radio"
          name="rating-10"
          class="rating-hidden"
          disabled
          checked
          :value="0"
        />
        <input
          v-for="n in 5"
          v-model.number="rating"
          :key="n"
          type="radio"
          name="rating-10"
          class="bg-orange-400 mask mask-star-2"
          :value="n"
          @change="handleChange(joke.id, n)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Joke, JokeId } from '@/types'

const props = defineProps<{
  joke: Joke
}>()

const rating = ref(0)
const opened = ref(false)

const emit = defineEmits<{
  (e: 'rated', payload: { jokeid: JokeId; rate: number }): void
}>()

function handleChange(jokeid: JokeId, rate: number) {
  emit('rated', { jokeid, rate })
}

watch(
  () => props.joke,
  (newValue) => {
    if (newValue.rating > 0) {
      rating.value = newValue.rating
      opened.value = true
    } else {
      rating.value = 0
      opened.value = false
    }
  }
)
</script>
