FROM node:18-alpine

WORKDIR /app

COPY src/package.json ./

RUN npm install --production

COPY src/ ./src

EXPOSE 3000

CMD ["node", "src/index.js"] 