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
    <div class="drop-shadow-2xl" v-html="`<iphone-16-max mode='dark'>${src ? `<img src='${src}' style='width: 100%; height: 100%; object-fit: cover;' />` : ''}</iphone-16-max>`"></div>
  </div>
</template>

<style scoped>
:deep(iphone-16-max) {
  width: 100%;
  height: auto;
  display: block;
}
</style>
