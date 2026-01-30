# ===== BUILD =====
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx prisma generate
RUN npm run build


# ===== RUNTIME =====
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3030

CMD ["node", "dist/index.js"]
