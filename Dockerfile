FROM node:20-slim AS builder

WORKDIR /app

# Enable corepack for pnpm
RUN corepack enable

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy app source and build
COPY . .
RUN pnpm run build

FROM node:20-slim

WORKDIR /app

COPY --from=builder /app/.output ./.output

EXPOSE 3000

ENV PORT=3000
ENV NODE_ENV=production

CMD ["node", ".output/server/index.mjs"]