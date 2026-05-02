<script setup lang="ts">
defineProps<{
  src?: string
}>()
</script>

<template>
  <div class="relative mx-auto w-full max-w-[280px] sm:max-w-[320px] aspect-[1/2.16] border-[10px] border-gray-900 dark:border-gray-800 rounded-[3rem] shadow-2xl overflow-hidden bg-black flex flex-col justify-center items-center">
    <!-- Dynamic Island / Notch -->
    <div class="absolute top-3 left-1/2 -translate-x-1/2 w-1/3 h-7 bg-black rounded-full z-20 flex justify-end items-center pr-2">
      <!-- Camera lens reflection -->
      <div class="w-3 h-3 rounded-full bg-gray-800 opacity-50"></div>
    </div>
    
    <!-- Screen Content -->
    <div class="w-full h-full rounded-[2.3rem] overflow-hidden bg-gray-950 flex justify-center items-center relative z-10 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
      <slot>
        <img v-if="src" :src="src" class="w-full h-full object-cover transition-opacity duration-500" />
      </slot>
    </div>
  </div>
</template>
