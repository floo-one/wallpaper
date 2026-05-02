<script setup lang="ts">
const wallpapers = [
  {
    id: 'life-calendar',
    title: 'Life Calendar',
    description: 'A 90-year life calendar that visualizes the weeks you have lived and the weeks you have left.',
    path: '/life-calendar',
    previewUrl: '/api/wallpaper?birthdate=1990-01-01&lifespan=90&bg_color=%23000000&filled_color=%23FFFFFF&empty_color=%23333333&width=1170&height=2532'
  }
  // We can add more wallpapers here later
]
</script>

<template>
  <UContainer class="py-12 space-y-12">
    <!-- Hero Section -->
    <div class="text-center space-y-4">
      <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight">
        Dynamic Wallpapers for iOS
      </h1>
      <p class="text-lg text-gray-500 max-w-2xl mx-auto">
        Configure beautiful, dynamic wallpapers that you can set to update automatically using Apple Shortcuts.
      </p>
    </div>

    <!-- Wallpaper Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <NuxtLink 
        v-for="wallpaper in wallpapers" 
        :key="wallpaper.id"
        :to="wallpaper.path"
        class="block group outline-none"
      >
        <UCard 
          class="h-full flex flex-col group-hover:ring-2 group-hover:ring-primary-500 group-focus-visible:ring-2 group-focus-visible:ring-primary-500 transition-all cursor-pointer"
        >
          <template #header>
            <h3 class="text-xl font-bold group-hover:text-primary-600 transition-colors">{{ wallpaper.title }}</h3>
            <p class="text-sm text-gray-500 line-clamp-2 mt-1">{{ wallpaper.description }}</p>
          </template>
          
          <div class="flex-1 flex items-center justify-center py-8 bg-gray-50 dark:bg-gray-900/50 rounded-lg overflow-hidden group-hover:bg-gray-100 dark:group-hover:bg-gray-800/80 transition-colors">
            <PhoneMockup :src="wallpaper.previewUrl" class="scale-[0.65] sm:scale-75 origin-center transform transition-transform group-hover:scale-75 sm:group-hover:scale-[0.80]" />
          </div>

          <template #footer>
            <div class="flex items-center justify-between text-primary-600 font-medium">
              <span>Configure wallpaper</span>
              <UIcon name="i-heroicons-arrow-right" class="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </template>
        </UCard>
      </NuxtLink>
    </div>
  </UContainer>
</template>
