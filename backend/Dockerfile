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

# Проверяем наличие скрипта build
RUN cat package.json | grep -A 5 "\"scripts\""

# Проверяем наличие скрипта build
RUN cat package.json | grep -A 5 "\"scripts\""

# Собираем проект через node_modules (правильный путь!)
RUN ./node_modules/.bin/lb-tsc

# Проверяем, что dist создалась
RUN ls -la dist/

ENV HOST=0.0.0.0 PORT=3000
EXPOSE ${PORT}

CMD ["node", "dist/index.js"]