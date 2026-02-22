FROM node:20-slim

RUN apt-get update && apt-get install -y \
    python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app
USER node
WORKDIR /home/node/app

# Копируем package.json (уже внутри backend, поэтому без префикса)
COPY --chown=node package*.json ./

RUN npm ci

# Копируем все исходники (без backend/)
COPY --chown=node . .

# Отладка: проверяем, что файлы на месте
RUN ls -la && ls -la src/ && cat tsconfig.json

# Сборка
RUN npm run build

# Проверяем dist
RUN ls -la dist/

ENV HOST=0.0.0.0 PORT=3000
EXPOSE ${PORT}

CMD sh -c "printenv && node dist/index.js"