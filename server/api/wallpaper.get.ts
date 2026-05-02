import { defineEventHandler, getQuery, sendStream } from 'h3'
import { createCanvas } from '@napi-rs/canvas'
import { differenceInWeeks, addYears, parseISO } from 'date-fns'
import { getSafeZones, type DeviceCategory } from '../../shared/utils/devices'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  // Parse parameters with defaults
  const birthdateStr = (query.birthdate as string) || '1990-01-01'
  const lifespan = parseInt((query.lifespan as string) || '90', 10)
  const width = parseInt((query.width as string) || '1170', 10) // iPhone 12/13 Pro width
  const height = parseInt((query.height as string) || '2532', 10) // iPhone 12/13 Pro height
  const category = (query.category as DeviceCategory) || 'notch'

  const bgColor = (query.bg_color as string) || '#000000'
  const filledColor = (query.filled_color as string) || '#FFFFFF'
  const emptyColor = (query.empty_color as string) || '#333333'
  const showPercentage = query.show_percentage === 'true'

  // Safe Area calculations for iPhone lock screens based on device category
  const { safeTop, safeBottom } = getSafeZones(category)
  const paddingTop = Math.floor(height * safeTop)
  const paddingBottom = Math.floor(height * safeBottom)
  const paddingSides = Math.floor(width * 0.02) // 8% padding on sides

  // Date math
  const birthDate = parseISO(birthdateStr)
  const today = new Date()

  const totalWeeks = lifespan * 52
  const livedWeeks = Math.max(0, differenceInWeeks(today, birthDate))

  // Ensure livedWeeks doesn't exceed totalWeeks
  const displayLivedWeeks = Math.min(livedWeeks, totalWeeks)

  // Canvas setup
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  // Background
  ctx.fillStyle = bgColor
  ctx.fillRect(0, 0, width, height)

  // Grid math
  const cols = 52 // 52 weeks in a year
  const rows = lifespan // One row per year

  const usableWidth = width - paddingSides * 2
  const usableHeight = height - paddingTop - paddingBottom

  const cellWidth = usableWidth / cols
  const cellHeight = usableHeight / rows

  // We want perfectly square cells, so we take the smaller of the two
  const cellSize = Math.min(cellWidth, cellHeight)
  const dotRadius = cellSize / 2 * 0.75 // 25% spacing between dots

  // Center the grid within the usable area
  const actualGridWidth = cols * cellSize
  const actualGridHeight = rows * cellSize
  const offsetX = paddingSides + (usableWidth - actualGridWidth) / 2
  const offsetY = paddingTop + (usableHeight - actualGridHeight) / 2

  // Drawing loop
  for (let i = 0; i < totalWeeks; i++) {
    const col = i % cols
    const row = Math.floor(i / cols)

    const x = offsetX + col * cellSize + cellSize / 2
    const y = offsetY + row * cellSize + cellSize / 2

    ctx.beginPath()
    ctx.arc(x, y, dotRadius, 0, Math.PI * 2)

    if (i < displayLivedWeeks) {
      ctx.fillStyle = filledColor
    } else {
      ctx.fillStyle = emptyColor
    }

    ctx.fill()
  }

  // Draw Percentage
  if (showPercentage) {
    const percentage = ((displayLivedWeeks / totalWeeks) * 100).toFixed(2)
    ctx.fillStyle = filledColor
    // Scale font size based on width
    const fontSize = Math.floor(width * 0.04)
    ctx.font = `600 ${fontSize}px sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    // Position text in the middle of the bottom safe area
    const textY = height - (paddingBottom / 2)
    ctx.fillText(`${percentage}%`, width / 2, textY)
  }

  // Response
  event.node.res.setHeader('Content-Type', 'image/png')
  const buffer = await canvas.encode('png')
  return buffer
})
