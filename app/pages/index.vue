<script setup lang="ts">
const wallpapers = [
  {
    id: 'life-calendar',
    title: 'Life Calendar',
    description: 'A 90-year life calendar that visualizes the days you have lived and the days you have left.',
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
      <UCard 
        v-for="wallpaper in wallpapers" 
        :key="wallpaper.id"
        class="group hover:ring-2 hover:ring-primary-500 transition-all cursor-pointer flex flex-col"
        :to="wallpaper.path"
      >
        <template #header>
          <h3 class="text-xl font-bold">{{ wallpaper.title }}</h3>
          <p class="text-sm text-gray-500 line-clamp-2 mt-1">{{ wallpaper.description }}</p>
        </template>
        
        <div class="flex-1 flex items-center justify-center py-6 bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden group-hover:bg-gray-100 dark:group-hover:bg-gray-800 transition-colors">
          <PhoneMockup :src="wallpaper.previewUrl" class="scale-75 md:scale-90 origin-center transform transition-transform group-hover:scale-100" />
        </div>

        <template #footer>
          <UButton color="gray" variant="ghost" block icon="i-heroicons-arrow-right" class="group-hover:bg-primary-50 dark:group-hover:bg-primary-950 group-hover:text-primary-600">
            Configure
          </UButton>
        </template>
      </UCard>
    </div>
  </UContainer>
</template>
