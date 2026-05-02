<script setup lang="ts">
import { ref, computed } from 'vue'

const birthdate = ref('1990-01-01')
const lifespan = ref(90)
const bgColor = ref('#000000')
const filledColor = ref('#FFFFFF')
const emptyColor = ref('#333333')

const presets = [
  { label: 'iPhone 12/13/14 (1170x2532)', value: '1170x2532' },
  { label: 'iPhone 12/13 mini (1080x2340)', value: '1080x2340' },
  { label: 'iPhone 14 Pro (1179x2556)', value: '1179x2556' },
  { label: 'iPhone 14 Pro Max (1290x2796)', value: '1290x2796' }
]
const selectedPreset = ref(presets[0].value)

const wallpaperUrl = computed(() => {
  const [width, height] = selectedPreset.value.split('x')
  const params = new URLSearchParams({
    birthdate: birthdate.value,
    lifespan: lifespan.value.toString(),
    bg_color: bgColor.value,
    filled_color: filledColor.value,
    empty_color: emptyColor.value,
    width,
    height
  })

  // Return the absolute URL if in browser, else relative
  const base = typeof window !== 'undefined' ? window.location.origin : ''
  return `${base}/api/wallpaper?${params.toString()}`
})

const copyUrl = async () => {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    await navigator.clipboard.writeText(wallpaperUrl.value)
    alert('Shortcut URL Copied!')
  }
}
</script>

<template>
  <UContainer class="py-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Configurator -->
      <UCard>
        <template #header>
          <h2 class="text-xl font-bold">
            Life Calendar Configurator
          </h2>
          <p class="text-sm text-gray-500">
            Set your parameters to generate your wallpaper API URL.
          </p>
        </template>

        <div class="space-y-4">
          <UFormField label="Birth Date">
            <UInput
              v-model="birthdate"
              type="date"
            />
          </UFormField>

          <UFormField label="Expected Lifespan (Years)">
            <UInput
              v-model="lifespan"
              type="number"
            />
          </UFormField>

          <UFormField label="Background Color">
            <div class="flex gap-2">
              <UInput
                v-model="bgColor"
                type="color"
                class="w-12 h-10 p-0 border-0"
              />
              <UInput
                v-model="bgColor"
                type="text"
                class="flex-1"
              />
            </div>
          </UFormField>

          <UFormField label="Lived Days Color">
            <div class="flex gap-2">
              <UInput
                v-model="filledColor"
                type="color"
                class="w-12 h-10 p-0 border-0"
              />
              <UInput
                v-model="filledColor"
                type="text"
                class="flex-1"
              />
            </div>
          </UFormField>

          <UFormField label="Future Days Color">
            <div class="flex gap-2">
              <UInput
                v-model="emptyColor"
                type="color"
                class="w-12 h-10 p-0 border-0"
              />
              <UInput
                v-model="emptyColor"
                type="text"
                class="flex-1"
              />
            </div>
          </UFormField>

          <UFormField label="Device Preset">
            <USelect
              v-model="selectedPreset"
              :items="presets"
            />
          </UFormField>

          <UButton
            color="primary"
            block
            @click="copyUrl"
          >
            Copy Apple Shortcuts URL
          </UButton>

          <div class="text-xs text-gray-500 mt-2 bg-gray-100 dark:bg-gray-800 p-2 rounded break-all">
            {{ wallpaperUrl }}
          </div>
        </div>
      </UCard>

      <!-- Preview -->
      <UCard>
        <template #header>
          <h2 class="text-xl font-bold">
            Preview
          </h2>
        </template>

        <div class="flex justify-center bg-gray-100 dark:bg-gray-900 p-8 rounded-lg overflow-hidden">
          <PhoneMockup :src="wallpaperUrl" />
        </div>
      </UCard>
    </div>
  </UContainer>
</template>
