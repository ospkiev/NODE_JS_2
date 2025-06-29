# docker/simple.Dockerfile
FROM node:20

WORKDIR /app

# ── 1. копіюємо маніфести для кешу ───────────────────────────────
COPY backend/package*.json   backend/
COPY frontend/package*.json  frontend/

# ── 2. встановлюємо залежності підпроєктів окремо ────────────────
RUN npm --prefix backend  install && \
    npm --prefix frontend install

# ── 3. копіюємо решту коду (JS, TS, assets…) ─────────────────────
COPY backend   backend
COPY frontend  frontend

# ── 4. білдимо SPA й кладемо всередину backend/build/ ────────────
RUN npm --prefix frontend run build && \
    rm -rf backend/build && \
    cp -R frontend/dist backend/build

# ── 5. стартуємо API-сервер ──────────────────────────────────────
EXPOSE 3000
CMD ["node", "backend/src/server.js"]