FROM node:20-slim

# Устанавливаем необходимые пакеты
RUN apt-get update && apt-get install -y \
    python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

# Создаем директорию и даем права
RUN mkdir -p /home/node/app && chown -R node:node /home/node/app
USER node
WORKDIR /home/node/app

# Копируем package.json из backend (не из корня!)
COPY --chown=node backend/package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем все исходники бэкенда (src, tsconfig.json и т.д.)
COPY --chown=node backend/ ./

# Проверяем, что файлы на месте
RUN ls -la && ls -la src/ && cat tsconfig.json

# Собираем проект
RUN npm run build

# Проверяем dist
RUN ls -la dist/

ENV HOST=0.0.0.0 PORT=3000
EXPOSE ${PORT}

CMD ["node", "dist/index.js"]