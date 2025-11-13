FROM node:20-bullseye-slim AS base

WORKDIR /app

# ========================
# Dependencies stage
# ========================
FROM base AS deps
# Copy package files
COPY bun.lock package.json ./
# Install production dependencies with Bun via npx (avoids global Bun)
RUN npx bun install --frozen-lockfile

# ========================
# Build stage
# ========================
FROM base AS builder
WORKDIR /app

# Install Bun only in the build stage
RUN apt-get update && apt-get install -y curl unzip && \
    BUN_VERSION=1.2.19 && \
    curl -fsSL https://github.com/oven-sh/bun/releases/download/bun-v${BUN_VERSION}/bun-linux-x64.zip -o bun.zip && \
    unzip bun.zip -d bun-temp && \
    mv bun-temp/bun-linux-x64/bun /usr/local/bin/bun && \
    rm -rf bun-temp bun.zip && \
    chmod +x /usr/local/bin/bun && \
    bun --version && \
    rm -rf /var/lib/apt/lists/*

# Copy dependencies and source code
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client and build with Bun
RUN bun x prisma generate
RUN mkdir -p /app/node_modules/@prisma/engines && chmod -R 777 /app/node_modules/@prisma/engines
RUN bun run build

# ========================
# Production stage
# ========================
FROM base AS runner
WORKDIR /app

# Add local node_modules binaries to PATH
ENV PATH="/app/node_modules/.bin:$PATH"

ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from build
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# ========================
# Run database migration and start the app
# Using npx bun to avoid global Bun install (AVX safe)
# ========================
CMD ["sh", "-c", "npx bun run migrate:prod && node server.js"]
