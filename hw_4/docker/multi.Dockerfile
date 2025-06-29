# syntax=docker/dockerfile:1.5

################ 1. deps (npm backend  +  pnpm frontend) ################
FROM node:20-alpine AS deps
RUN corepack enable
WORKDIR /workspace

COPY backend/package*.json           backend/
COPY frontend/package.json frontend/pnpm-lock.yaml  frontend/

# npm (backend) – dev+prod   |   pnpm (frontend) – dev+prod
RUN --mount=type=cache,target=/root/.npm \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
    npm  --prefix backend  ci          && \
    pnpm --prefix frontend install --no-frozen-lockfile

################ 2. backend build (esbuild bundle) #######################
FROM deps AS backend-build
WORKDIR /workspace/backend
COPY backend/ .
RUN node build.mjs                      # → dist/server.js

################ 3. frontend build (vite) ################################
FROM deps AS frontend-build
WORKDIR /workspace/frontend
COPY frontend/ .
RUN pnpm run build                      # → dist/

################ 4. runtime ################################################
FROM alpine:3.19
RUN apk add --no-cache nodejs tini
WORKDIR /app

COPY --from=backend-build /workspace/backend/dist/server.mjs ./server.mjs
COPY --from=frontend-build /workspace/frontend/dist           ./build

ENV NODE_ENV=production
EXPOSE 3000
ENTRYPOINT ["/sbin/tini","--"]
CMD ["node","server.mjs"]