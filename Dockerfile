FROM node:20-alpine

WORKDIR /app

# Сначала копируем только файлы зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Только потом копируем остальной код
COPY . .

EXPOSE 5173

# Используем прямой запуск через флаги Vite
CMD ["npm", "run", "dev", "--", "--host"]