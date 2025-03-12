FROM node:22.7.0-alpine AS builder
WORKDIR /app

# Pass environment variables at build time
ARG VITE_OIDC_ISSUER
ARG VITE_OIDC_CLIENT_ID
ARG VITE_BASE_URL
ARG VITE_APP_VERSION
ARG VITE_MOSAIC_GATEWAY_URL

# Ensure these values are available in the build
ENV VITE_OIDC_ISSUER=$VITE_OIDC_ISSUER
ENV VITE_OIDC_CLIENT_ID=$VITE_OIDC_CLIENT_ID
ENV VITE_BASE_URL=$VITE_BASE_URL
ENV VITE_APP_VERSION=$VITE_APP_VERSION
ENV VITE_MOSAIC_GATEWAY_URL=$VITE_MOSAIC_GATEWAY_URL

# Copy only essential files first (better caching)
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---- Final, Minimal Production Image ----
FROM node:22.7.0-alpine AS runner
WORKDIR /app

RUN npm install --omit=dev serve

# Copy only the built dist folder & package.json
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["npx", "serve", "-s", "dist"]