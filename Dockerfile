FROM node:24-bookworm-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY backend/src ./backend/src
COPY frontend/index.html ./frontend/index.html
COPY frontend/css ./frontend/css
COPY frontend/js ./frontend/js

RUN mkdir -p /app/data && chown node:node /app/data

ENV PORT=3000 \
    ARQUIVO_DADOS=/app/data/pessoas.json

EXPOSE 3000
USER node

CMD ["node", "backend/src/servidor.js"]
