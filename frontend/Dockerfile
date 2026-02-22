FROM node:20-slim as builder

WORKDIR /frontend

# Копируем зависимости
COPY package*.json ./
RUN npm ci
RUN npm install @rollup/rollup-linux-x64-gnu

# Копируем исходники и собираем
COPY . .
RUN npm run build

# Финальный образ для статики
FROM node:20-slim

WORKDIR /frontend

# Устанавливаем простой сервер
RUN npm install -g serve

# Копируем собранные файлы
COPY --from=builder /frontend/dist ./dist

# Открываем порт
EXPOSE 8080

# Запускаем статический сервер
CMD ["serve", "-s", "dist", "-l", "8080"]