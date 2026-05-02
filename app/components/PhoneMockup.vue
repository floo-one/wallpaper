<script setup lang="ts">
import { useHead } from '#imports'

const props = withDefaults(defineProps<{
  src?: string
  maxWidth?: string
}>(), {
  maxWidth: '280px'
})

useHead({
  script: [
    {
      src: 'https://cdn.jsdelivr.net/npm/@sneas/telephone@1/iphone-16-max.js',
      type: 'module',
      defer: true
    }
  ]
})
</script>

<template>
  <div class="relative mx-auto w-full shrink-0" :style="{ maxWidth }">
    <iphone-16-max mode="dark" class="drop-shadow-2xl">
      <img v-if="src" :src="src" class="w-full h-full object-cover" />
    </iphone-16-max>
  </div>
</template>

<style scoped>
iphone-16-max {
  width: 100%;
  height: auto;
  display: block;
}
</style>
