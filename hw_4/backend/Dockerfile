# builder
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY src ./src

# runtime
FROM alpine:3.19
RUN apk add --no-cache nodejs tini
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
COPY build ./build
COPY uploads ./uploads
COPY src/docs/upload.yaml ./src/docs/upload.yaml
COPY src/docs/upload.yaml ./upload.yaml
COPY package.json ./
USER 1000
ENTRYPOINT ["/sbin/tini","--"]
CMD ["node","src/server.js"]
EXPOSE 3000