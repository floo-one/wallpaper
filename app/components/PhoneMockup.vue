<script setup lang="ts">
defineProps<{
  src?: string
}>()
</script>

<template>
  <div class="relative mx-auto w-[280px] aspect-[1/2.16] border-14 border-gray-900 rounded-[3.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden bg-black flex flex-col justify-center items-center shrink-0">
    <!-- Volume & Power Buttons -->
    <div class="absolute left-[-14px] top-[100px] w-1 h-12 bg-gray-800 rounded-l-md" />
    <div class="absolute left-[-14px] top-[160px] w-1 h-12 bg-gray-800 rounded-l-md" />
    <div class="absolute right-[-14px] top-[120px] w-1 h-16 bg-gray-800 rounded-r-md" />

    <!-- Dynamic Island / Notch -->
    <div class="absolute top-3 left-1/2 -translate-x-1/2 w-[35%] h-7 bg-black rounded-full z-20 flex justify-end items-center pr-2 shadow-sm">
      <!-- Camera lens reflection -->
      <div class="w-3 h-3 rounded-full bg-gray-800/80 opacity-50 relative">
        <div class="absolute top-0.5 right-0.5 w-1 h-1 bg-blue-500/30 rounded-full" />
      </div>
    </div>

    <!-- Screen Content -->
    <div class="w-full h-full rounded-[2.5rem] overflow-hidden bg-gray-950 flex justify-center items-center relative z-10 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
      <slot>
        <img
          v-if="src"
          :src="src"
          class="w-full h-full object-cover transition-opacity duration-500"
        >
      </slot>
    </div>
  </div>
</template>
