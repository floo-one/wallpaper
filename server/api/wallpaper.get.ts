import { defineEventHandler, getQuery, sendStream } from 'h3';
import { createCanvas } from '@napi-rs/canvas';
import { differenceInDays, addYears, parseISO } from 'date-fns';

export default defineEventHandler((event) => {
  const query = getQuery(event);

  // Parse parameters with defaults
  const birthdateStr = (query.birthdate as string) || '1990-01-01';
  const lifespan = parseInt((query.lifespan as string) || '90', 10);
  const width = parseInt((query.width as string) || '1170', 10); // iPhone 12/13 Pro width
  const height = parseInt((query.height as string) || '2532', 10); // iPhone 12/13 Pro height
  
  const bgColor = (query.bg_color as string) || '#000000';
  const filledColor = (query.filled_color as string) || '#FFFFFF';
  const emptyColor = (query.empty_color as string) || '#333333';
  const paddingStr = query.padding as string;
  
  // Calculate padding dynamically if not provided
  const padding = paddingStr ? parseInt(paddingStr, 10) : Math.floor(width * 0.05);

  // Date math
  const birthDate = parseISO(birthdateStr);
  const today = new Date();
  const deathDate = addYears(birthDate, lifespan);

  const totalDays = differenceInDays(deathDate, birthDate);
  const livedDays = Math.max(0, differenceInDays(today, birthDate));

  // Ensure livedDays doesn't exceed totalDays
  const displayLivedDays = Math.min(livedDays, totalDays);

  // Canvas setup
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  // Grid math
  // We need an optimal number of columns and rows to fit the total days within the screen bounds
  const usableWidth = width - padding * 2;
  const usableHeight = height - padding * 2;
  const aspectRatio = usableHeight / usableWidth;

  // cols * rows = totalDays
  // rows / cols = aspectRatio -> rows = cols * aspectRatio
  // cols * (cols * aspectRatio) = totalDays
  // cols^2 = totalDays / aspectRatio
  let cols = Math.ceil(Math.sqrt(totalDays / aspectRatio));
  let rows = Math.ceil(totalDays / cols);

  // Re-adjust if necessary
  while (cols * rows < totalDays) {
    rows++;
  }

  const cellWidth = usableWidth / cols;
  const cellHeight = usableHeight / rows;
  const cellSize = Math.min(cellWidth, cellHeight);
  
  const dotRadius = cellSize / 2 * 0.7; // 30% spacing between dots

  // Center the grid within the usable area
  const actualGridWidth = cols * cellSize;
  const actualGridHeight = rows * cellSize;
  const offsetX = padding + (usableWidth - actualGridWidth) / 2;
  const offsetY = padding + (usableHeight - actualGridHeight) / 2;

  // Drawing loop
  for (let i = 0; i < totalDays; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);

    const x = offsetX + col * cellSize + cellSize / 2;
    const y = offsetY + row * cellSize + cellSize / 2;

    ctx.beginPath();
    ctx.arc(x, y, dotRadius, 0, Math.PI * 2);

    if (i < displayLivedDays) {
      ctx.fillStyle = filledColor;
    } else {
      ctx.fillStyle = emptyColor;
    }
    
    ctx.fill();
  }

  // Response
  event.node.res.setHeader('Content-Type', 'image/png');
  return sendStream(event, canvas.createPNGStream());
});