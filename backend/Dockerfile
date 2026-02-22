FROM node:20-slim

# Устанавливаем необходимые пакеты
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Создаем директорию и даем права
RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

USER node

WORKDIR /home/node/app

# Копируем package.json
COPY --chown=node package*.json ./

# Устанавливаем зависимости (без аудита для скорости)
RUN npm ci --no-audit

# Копируем исходники
COPY --chown=node . .

# МАКСИМАЛЬНАЯ ОТЛАДКА (с исправленными ошибками)
RUN echo "=== СОДЕРЖИМОЕ ДИРЕКТОРИИ ===" && ls -la
RUN echo "=== СОДЕРЖИМОЕ package.json ===" && cat package.json
RUN echo "=== ВСЕ СКРИПТЫ ===" && npm run || echo "npm run показал скрипты"

# Проверяем node_modules/.bin (без grep, чтобы не падать)
RUN echo "=== ПРОВЕРЯЕМ node_modules/.bin ===" && ls -la node_modules/.bin/ || echo "Нет файлов в .bin"

# Проверяем @loopback/build
RUN echo "=== ПРОВЕРЯЕМ @loopback/build ===" && ls -la node_modules/@loopback/build/bin/ 2>/dev/null || echo "Нет папки @loopback/build"

# Пробуем разные способы сборки
RUN echo "=== СПОСОБ 1: npx ===" && npx lb-tsc || echo "npx не сработал"
RUN echo "=== СПОСОБ 2: прямой путь ===" && ./node_modules/.bin/lb-tsc || echo "прямой путь не сработал"
RUN echo "=== СПОСОБ 3: через @loopback ===" && ./node_modules/@loopback/build/bin/lb-tsc.js || echo "loopback путь не сработал"
RUN echo "=== СПОСОБ 4: npm script ===" && npm run build || echo "npm script не сработал"

# Проверяем результат
RUN echo "=== РЕЗУЛЬТАТ ===" && ls -la dist/ || echo "dist не создалась"

ENV HOST=0.0.0.0 PORT=3000
EXPOSE ${PORT}

CMD ["node", "dist/index.js"]