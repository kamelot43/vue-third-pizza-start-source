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
RUN npm ci

# Копируем исходники (ВАЖНО: сначала все файлы)
COPY --chown=node . .

# ПРОВЕРЯЕМ, ЧТО ФАЙЛЫ СКОПИРОВАЛИСЬ
RUN echo "=== СОДЕРЖИМОЕ src ===" && ls -la src/ || echo "src не существует"
RUN echo "=== tsconfig.json ===" && cat tsconfig.json

# Устанавливаем @loopback/build
RUN npm install --save-dev @loopback/build

# Запускаем сборку
RUN echo "=== ЗАПУСК СБОРКИ ===" && npx lb-tsc

# Проверяем результат
RUN echo "=== ПРОВЕРКА dist ===" && ls -la dist/ || echo "dist НЕ создалась!"

ENV HOST=0.0.0.0 PORT=3000
EXPOSE ${PORT}

CMD ["node", "dist/index.js"]