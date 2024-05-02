<template>
  <div class="flex items-center justify-center">
    <div class="hero">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">{{ title }}</h1>
          <p class="py-6">
            {{ description }}
          </p>
          <button @click="$emit('completed')" class="btn btn-primary">
            Get Started
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string,
  description: string
}>()

defineEmits(['completed'])
</script>
