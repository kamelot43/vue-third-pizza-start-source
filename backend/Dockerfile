FROM node:20-slim

RUN apt-get update && apt-get install -y \
    python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

USER node
WORKDIR /home/node/app

# ---- Шаг 1: копируем только package.json ----
COPY --chown=node package*.json ./
RUN echo "=== ПОСЛЕ КОПИРОВАНИЯ package.json ===" && ls -la

# ---- Шаг 2: устанавливаем зависимости ----
RUN npm ci
RUN echo "=== ПОСЛЕ npm ci ===" && ls -la

# ---- Шаг 3: копируем все исходники ----
COPY --chown=node . .
RUN echo "=== ПОСЛЕ КОПИРОВАНИЯ . . ===" && ls -la

# ---- Шаг 4: проверяем наличие нужных папок ----
RUN echo "=== СОДЕРЖИМОЕ src (если есть) ===" && ls -la src || echo "src не найдена"
RUN echo "=== СОДЕРЖИМОЕ tsconfig.json (если есть) ===" && cat tsconfig.json || echo "tsconfig.json не найден"

# ---- Шаг 5: устанавливаем @loopback/build и собираем ----
RUN npm install --save-dev @loopback/build
RUN npx lb-tsc || echo "СБОРКА НЕ УДАЛАСЬ"

# ---- Шаг 6: проверяем dist ----
RUN echo "=== РЕЗУЛЬТАТ СБОРКИ ===" && ls -la dist || echo "dist не создана"

ENV HOST=0.0.0.0 PORT=3000
EXPOSE 3000
CMD ["node", "dist/index.js"]