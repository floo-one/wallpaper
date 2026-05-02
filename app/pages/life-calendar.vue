<script setup lang="ts">
import { ref, computed } from 'vue'

const birthdate = ref()
const lifespan = ref(90)
const bgColor = ref('#000000')
const filledColor = ref('#FFFFFF')
const emptyColor = ref('#333333')
const showPercentage = ref(true)

const presets = IOS_DEVICES.map(device => ({
  label: `${device.model} (${device.width}x${device.height})`,
  value: `${device.width}x${device.height}x${device.category}`
}))
const selectedPreset = ref(presets.find(p => p.label.includes('14 Pro /'))?.value || presets[0].value)

const wallpaperUrl = computed(() => {
  const [width, height, category] = (selectedPreset.value || '1179x2556xisland').split('x')
  const paramsRecord: Record<string, string> = {
    birthdate: birthdate.value,
    lifespan: lifespan.value.toString(),
    bg_color: bgColor.value,
    filled_color: filledColor.value,
    empty_color: emptyColor.value,
    show_percentage: showPercentage.value.toString()
  }
  if (width) paramsRecord.width = width
  if (height) paramsRecord.height = height
  if (category) paramsRecord.category = category

  const params = new URLSearchParams(paramsRecord)

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

          <UFormField>
            <UCheckbox
              v-model="showPercentage"
              label="Show completion percentage at the bottom"
            />
          </UFormField>

          <UFormField label="Device Preset">
            <USelectMenu
              v-model="selectedPreset"
              :items="presets"
              class="w-full"
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
          <PhoneMockup
            :src="wallpaperUrl"
            max-width="320px"
          />
        </div>
      </UCard>
    </div>

    <!-- Installation Guide -->
    <div class="mt-8">
      <InstallationGuide />
    </div>
  </UContainer>
</template>
