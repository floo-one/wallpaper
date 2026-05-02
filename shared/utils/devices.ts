export type DeviceCategory = 'classic' | 'notch' | 'island'

export interface DevicePreset {
  model: string
  width: number
  height: number
  category: DeviceCategory
}

export const IOS_DEVICES: DevicePreset[] = [
  // Classic Home Button Devices
  { model: 'iPhone SE (2016) / 5s', width: 640, height: 1136, category: 'classic' },
  { model: 'iPhone 6 / 6s / 7 / 8 / SE (2020)', width: 750, height: 1334, category: 'classic' },
  { model: 'iPhone 6+ / 6s+ / 7+ / 8+', width: 1080, height: 1920, category: 'classic' },

  // Notch Devices
  { model: 'iPhone X / XS / 11 Pro', width: 1125, height: 2436, category: 'notch' },
  { model: 'iPhone XR / 11', width: 828, height: 1792, category: 'notch' },
  { model: 'iPhone XS Max / 11 Pro Max', width: 1242, height: 2688, category: 'notch' },
  { model: 'iPhone 12 mini / 13 mini', width: 1080, height: 2340, category: 'notch' },
  { model: 'iPhone 12 / 12 Pro / 13 / 13 Pro / 14', width: 1170, height: 2532, category: 'notch' },
  { model: 'iPhone 12 Pro Max / 13 Pro Max / 14 Plus', width: 1284, height: 2778, category: 'notch' },

  // Dynamic Island Devices
  { model: 'iPhone 14 Pro / 15 / 15 Pro / 16', width: 1179, height: 2556, category: 'island' },
  { model: 'iPhone 14 Pro Max / 15 Plus / 15 Pro Max / 16 Plus', width: 1290, height: 2796, category: 'island' }
]

export function getSafeZones(category: DeviceCategory) {
  switch (category) {
    case 'classic':
      return { safeTop: 0.15, safeBottom: 0.10 }
    case 'island':
      return { safeTop: 0.34, safeBottom: 0.16 }
    case 'notch':
    default:
      return { safeTop: 0.32, safeBottom: 0.16 }
  }
}
