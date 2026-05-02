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
  { label: 'iPhone 14 Pro Max (1290x2796)', value: '1290x2796' },
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
          <h2 class="text-xl font-bold">Life Calendar Configurator</h2>
          <p class="text-sm text-gray-500">Set your parameters to generate your wallpaper API URL.</p>
        </template>

        <div class="space-y-4">
          <UFormField label="Birth Date">
            <UInput type="date" v-model="birthdate" />
          </UFormField>

          <UFormField label="Expected Lifespan (Years)">
            <UInput type="number" v-model="lifespan" />
          </UFormField>

          <UFormField label="Background Color">
            <div class="flex gap-2">
              <UInput type="color" v-model="bgColor" class="w-12 h-10 p-0 border-0" />
              <UInput type="text" v-model="bgColor" class="flex-1" />
            </div>
          </UFormField>

          <UFormField label="Lived Days Color">
            <div class="flex gap-2">
              <UInput type="color" v-model="filledColor" class="w-12 h-10 p-0 border-0" />
              <UInput type="text" v-model="filledColor" class="flex-1" />
            </div>
          </UFormField>

          <UFormField label="Future Days Color">
            <div class="flex gap-2">
              <UInput type="color" v-model="emptyColor" class="w-12 h-10 p-0 border-0" />
              <UInput type="text" v-model="emptyColor" class="flex-1" />
            </div>
          </UFormField>

          <UFormField label="Device Preset">
            <USelect v-model="selectedPreset" :items="presets" />
          </UFormField>

          <UButton @click="copyUrl" color="primary" block>
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
          <h2 class="text-xl font-bold">Preview</h2>
        </template>
        
        <div class="flex justify-center bg-gray-100 dark:bg-gray-900 p-4 rounded overflow-hidden">
          <img 
            :src="wallpaperUrl" 
            alt="Life Calendar Preview" 
            class="max-w-full h-auto max-h-[600px] object-contain rounded-3xl shadow-xl border border-gray-800"
          />
        </div>
      </UCard>
      
    </div>
  </UContainer>
</template>