# ---- Build Stage ----
FROM node:22.7.0-alpine AS builder
WORKDIR /app

# Copy only essential files first (better caching)
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---- Final, Minimal Production Image ----
FROM node:22.7.0-alpine AS runner
WORKDIR /app

# Install serve only in final stage (no global install)
RUN npm install --omit=dev serve

# Copy only the built dist folder & package.json
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["npx", "serve", "-s", "dist"]