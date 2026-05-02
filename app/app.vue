<script setup lang="ts">
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  title: 'Life Calendar Wallpaper Generator',
  description: 'Generate dynamic Life Calendar wallpapers for your iPhone shortcuts.',
  ogTitle: 'Life Calendar Wallpaper Generator'
})
</script>

<template>
  <UApp>
    <UHeader>
      <template #left>
        <NuxtLink to="/" class="font-bold text-xl">
          wallpaper
        </NuxtLink>
      </template>

      <template #right>
        <UColorModeButton />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <USeparator />

    <UFooter>
      <template #left>
        <p class="text-sm text-gray-500">
          Stateless dynamic wallpaper API.
        </p>
      </template>
    </UFooter>
  </UApp>
</template>
