<template>
  <UCard>
    <template #header>
      <div class="flex items-center gap-2">
        <UIcon name="i-heroicons-device-phone-mobile" class="w-6 h-6 text-primary" />
        <h2 class="text-xl font-bold">
          How to Install on iOS
        </h2>
      </div>
      <p class="text-sm text-gray-500 mt-1">
        Follow these steps to automatically update your wallpaper every day.
      </p>
    </template>

    <ol class="space-y-4 list-decimal list-inside text-gray-700 dark:text-gray-300 ml-4 marker:text-primary font-medium">
      <li><span class="font-normal">Copy your personalized generated URL from above.</span></li>
      <li><span class="font-normal">Open the <strong>Shortcuts</strong> app on your iPhone.</span></li>
      <li><span class="font-normal">Go to the <strong>Automation</strong> tab at the bottom.</span></li>
      <li><span class="font-normal">Tap the <strong>+</strong> icon in the top right (or "New Automation").</span></li>
      <li><span class="font-normal">Select <strong>Time of Day</strong> and choose a time (e.g., 6:00 AM).</span></li>
      <li><span class="font-normal">Set Repeat to <strong>Daily</strong> and select <strong>Run Immediately</strong>. Tap Next.</span></li>
      <li><span class="font-normal">Select <strong>New Blank Shortcut</strong>.</span></li>
      <li><span class="font-normal">Add the <strong>"Get Contents of URL"</strong> action and paste your copied URL.</span></li>
      <li><span class="font-normal">Add the <strong>"Get Images from Input"</strong> action.</span></li>
      <li><span class="font-normal">Add the <strong>"Set Wallpaper"</strong> action, using the image from the previous step.</span></li>
      <li><span class="font-normal">Tap the arrow on the Set Wallpaper action and turn off <strong>"Show Preview"</strong>.</span></li>
      <li><span class="font-normal">Tap <strong>Done</strong> to save your automation.</span></li>
    </ol>
  </UCard>
</template>
