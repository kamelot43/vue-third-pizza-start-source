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

# Устанавливаем зависимости
RUN npm ci --no-audit

# Копируем исходники
COPY --chown=node . .

# МАКСИМАЛЬНАЯ ОТЛАДКА
RUN echo "=== СОДЕРЖИМОЕ ДИРЕКТОРИИ ===" && ls -la
RUN echo "=== СОДЕРЖИМОЕ package.json ===" && cat package.json
RUN echo "=== ВСЕ СКРИПТЫ ===" && npm run
RUN echo "=== ПРОВЕРЯЕМ node_modules/.bin ===" && ls -la node_modules/.bin/ | grep lb
RUN echo "=== ПРОВЕРЯЕМ @loopback/build ===" && ls -la node_modules/@loopback/build/bin/ || echo "Нет папки"

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