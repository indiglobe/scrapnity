# =========================
# Stage 1: Builder
# =========================
FROM node:22-alpine AS builder

WORKDIR /app

# Enable pnpm
RUN corepack enable
RUN pnpm config set minimum-release-age 0

# Copy dependency files
COPY package.json pnpm-lock.yaml ./

# Install all dependencies
RUN pnpm install --frozen-lockfile

# Copy source
COPY . .

# Declare build args (secrets for prerender)
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG BETTER_AUTH_SECRET
ARG BETTER_AUTH_URL
ARG DATABASE_URL
ARG APP_HOST
ARG RAZOR_PAY_KEY
ARG RAZOR_PAY_SECRET

ARG VITE_APP_HOST
ARG VITE_RAZOR_PAY_KEY

# Set temporary ENV for build (not persisted in final image)
ENV \
  GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID \
  GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET \
  BETTER_AUTH_SECRET=$BETTER_AUTH_SECRET \
  BETTER_AUTH_URL=$BETTER_AUTH_URL \
  DATABASE_URL=$DATABASE_URL \
  APP_HOST=$APP_HOST \
  RAZOR_PAY_KEY=$RAZOR_PAY_KEY \
  RAZOR_PAY_SECRET=$RAZOR_PAY_SECRET \
  VITE_APP_HOST=$VITE_APP_HOST \
  VITE_RAZOR_PAY_KEY=$VITE_RAZOR_PAY_KEY

# Create a env file at the root of the proj
RUN cat > .env.production <<EOF
GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET
BETTER_AUTH_SECRET=$BETTER_AUTH_SECRET
BETTER_AUTH_URL=$BETTER_AUTH_URL
DATABASE_URL=$DATABASE_URL
APP_HOST=$APP_HOST
RAZOR_PAY_KEY=$RAZOR_PAY_KEY
RAZOR_PAY_SECRET=$RAZOR_PAY_SECRET
VITE_APP_HOST=$VITE_APP_HOST
VITE_RAZOR_PAY_KEY=$VITE_RAZOR_PAY_KEY
EOF

# Build TypeScript
RUN pnpm build


# =========================
# Stage 2: Runner
# =========================
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN corepack enable
RUN pnpm config set minimum-release-age 0

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install production dependencies only
RUN pnpm install --prod --frozen-lockfile

# Copy compiled application
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "/dist/server/index.mjs"]
