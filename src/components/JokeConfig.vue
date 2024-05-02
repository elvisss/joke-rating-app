<template>
  <div>
    <h2 class="text-3xl mb-5 text-center">Initial configuration</h2>

    <form class="space-y-10 text-left" @submit.prevent="handleSubmit">
      <fieldset>
        <legend class="text-sm font-semibold leading-6 text-white-900">
          Quantity
        </legend>
        <label
          for="quantity"
          class="inline-block mt-1 mb-2 text-sm leading-6 text-white-600"
        >
          Select how many jokes you want to rate:
          <span v-if="jokesQuantity" class="badge badge-primary w-10">{{ jokesQuantity }}</span>
        </label>

        <input
          id="quantity"
          type="range"
          min="0"
          max="30"
          value="0"
          class="range"
          step="10"
          v-model.number="jokesQuantity"
        />

        <div class="w-full flex justify-between text-xs px-2">
          <span v-for="n in 4" :key="n">{{ (n - 1) * 10 }}</span>
        </div>
      </fieldset>
      
      <fieldset>
        <legend class="text-sm font-semibold leading-6 text-white-900">
          Joke Type
        </legend>

        <p class="inline-block mt-1 mb-2 text-sm leading-6 text-white-600">
          Select the type of jokes you want to rate:
          <span v-if="jokeType" class="badge badge-primary m-w-10 capitalize">{{ jokeType }}</span>
        </p>

        <div
          v-for="type in jokeTypes"
          :key="type"
          class="form-control"
        >
          <label :for="type" class="label cursor-pointer">
            <span class="label-text capitalize">{{ type }}</span>
            <input
              :id="type"
              v-model="jokeType"
              type="radio"
              name="radio-10"
              class="radio"
              :value="type"
            />
          </label>
        </div>
      </fieldset>

      <div class="mt-6 flex justify-center">
        <button :disabled="disabledButton" class="btn btn-primary" type="submit">Start rating</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { JOKE_TYPES } from '@/constants'
import type { JokeType } from '@/types'
import { ref, computed } from 'vue'

const emit = defineEmits<{
  (e: 'completed', payload: { type: JokeType, quantity: number }): void
}>()

const jokeTypes = Object.values(JOKE_TYPES)

const jokeType = ref<JokeType>('all')
const jokesQuantity = ref(0)

const disabledButton = computed(() => !jokeType.value || jokesQuantity.value === 0)

function handleSubmit() {
  emit('completed', { type: jokeType.value, quantity: jokesQuantity.value})
}
</script>
