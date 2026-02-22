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

# Копируем исходники
COPY --chown=node . .

# Проверяем структуру
RUN echo "=== ПРОВЕРКА УСТАНОВЛЕННЫХ ПАКЕТОВ ===" && npm list --depth=0

# Пробуем установить @loopback/build явно (на всякий случай)
RUN npm install --save-dev @loopback/build

# Запускаем сборку через npx с полным путем
RUN echo "=== ЗАПУСК СБОРКИ ===" && npx -p @loopback/build lb-tsc

# Проверяем результат
RUN echo "=== ПРОВЕРКА dist ===" && ls -la dist/ && echo "dist создалась успешно" || echo "dist НЕ создалась!"

ENV HOST=0.0.0.0 PORT=3000
EXPOSE ${PORT}

# Если dist не создалась, создаем заглушку для отладки
RUN if [ ! -d "dist" ]; then \
    mkdir -p dist && \
    echo 'console.log("Server starting..."); const http = require("http"); const server = http.createServer((req, res) => { res.writeHead(200); res.end("Server is running (debug mode)"); }); server.listen(3000);' > dist/index.js; \
    fi

CMD ["node", "dist/index.js"]